import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Button from '@components/core/button';
import Checkbox from '@components/core/checkbox';
import { EmailIcon, LockIcon } from '@components/core/icons';
import Input from '@components/core/input';
import useI18n from '@hooks/use-i18n';
import { useSignInWithEmailAndPasswordMutation } from '@store';
import { PAGES, SignInWithEmailAndPasswordProps } from '@types';
import checkApiError from '@utils/check-api-error';

import languages from './i18n';

const SignIn = (): JSX.Element => {
  const translate = useI18n(languages);
  const [signInWithEmailAndPassword, { isLoading, isError, error }] = useSignInWithEmailAndPasswordMutation();

  const { isNetworkError } = checkApiError(error as AxiosError);

  const schema = yup.object({
    email: yup
      .string()
      .required(`${translate('EMAIL_REQUIRED')}`)
      .email(`${translate('INVALID_EMAIL')}`),
    password: yup.string().required(`${translate('PASSWORD_REQUIRED')}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInWithEmailAndPasswordProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignInWithEmailAndPasswordProps) => signInWithEmailAndPassword(data);

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

          <Input
            type="password"
            size="large"
            placeholder="**********"
            labelOptions={{
              text: translate('PASSWORD'),
            }}
            iconOptions={{
              icon: LockIcon,
            }}
            errorOptions={{
              message: errors.password?.message,
            }}
            isRequired
            isLoading={isLoading}
            {...register('password')}
          />
        </div>

        <div className="flex flex-wrap justify-between w-full mt-8 gap-x-2">
          <Checkbox
            label={{
              text: translate('REMEMBER'),
            }}
            {...register('remember')}
          />

          <Link to={PAGES.FORGOT_PASSWORD}>
            <div className="text-primary cursor-pointer whitespace-nowrap | hover:underline select-none">
              {translate('FORGOT')}
            </div>
          </Link>
        </div>

        <div className="mt-4">
          <Button type="submit" size="large" isLoading={isLoading} className="w-full font-bold uppercase">
            {translate('CONFIRM')}
          </Button>
        </div>

        {isError && !isNetworkError && (
          <div className="flex justify-center mt-4 text-sm text-error">{translate('WRONG_CREDENTIALS')}</div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
