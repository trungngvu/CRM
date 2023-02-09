import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Button from '@components/core/button';
import { EmailIcon } from '@components/core/icons';
import Input from '@components/core/input';
import useI18n from '@hooks/use-i18n';
import { useForgotPasswordMutation } from '@store';
import { ForgotPasswordProps, PAGES } from '@types';

import languages from './i18n';

const ForgotPassword = (): JSX.Element => {
  const translate = useI18n(languages);
  const [forgotPassword, { isLoading, isError, error }] = useForgotPasswordMutation();

  const isNetworkError = isError && !(error as AxiosError)?.status;

  const schema = yup.object({
    email: yup
      .string()
      .required(`${translate('EMAIL_REQUIRED')}`)
      .email(`${translate('INVALID_EMAIL')}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ForgotPasswordProps) => forgotPassword(data);

  useEffect(() => {
    if (isNetworkError) {
      toast.error(translate('FETCH_ERROR'), {
        theme: 'colored',
        autoClose: 4000,

        pauseOnHover: false,
      });
    }
  }, [isNetworkError]);

  return (
    <div className="flex items-center justify-center w-full h-full p-2 place-items-center bg-light sm:p-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white p-[30px] rounded-[20px] w-full md:w-[500px] shadow-3"
      >
        <div className="mb-5 text-2xl font-bold text-center">{translate('TITLE')}</div>

        <div className="flex flex-col gap-y-4">
          <Input
            size="large"
            placeholder="123@gmail.com"
            labelOptions={{
              text: translate('EMAIL'),
            }}
            iconOptions={{
              icon: EmailIcon,
            }}
            errorOptions={{
              message: errors.email?.message,
            }}
            isRequired
            isLoading={isLoading}
            {...register('email')}
          />
        </div>

        <div className="mt-8">
          <Button type="submit" size="large" isLoading={isLoading} className="w-full">
            {translate('CONFIRM')}
          </Button>
        </div>

        <div className="flex flex-wrap justify-center w-full gap-2 mt-4">
          <Link to={PAGES.SIGN_IN}>
            <div className="text-primary cursor-pointer whitespace-nowrap | hover:underline select-none">
              {translate('SIGN_IN')}
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
