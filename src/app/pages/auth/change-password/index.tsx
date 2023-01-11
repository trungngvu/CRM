import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Button from '@components/core/button';
import { LockIcon } from '@components/core/icons';
import Input from '@components/core/input';
import useI18n from '@hooks/use-i18n';
import { useChangePasswordMutation } from '@store';
import { ChangePasswordProps, LANGUAGES } from '@types';

import { en, vi } from './i18n';

const ChangePassword = (): JSX.Element => {
  const translate = useI18n({
    name: ChangePassword.name,
    data: [
      {
        key: LANGUAGES.EN,
        value: en,
      },
      {
        key: LANGUAGES.VI,
        value: vi,
      },
    ],
  });
  const [changePassword, { isLoading, isError, error }] = useChangePasswordMutation();

  const isNetworkError = isError && !(error as AxiosError)?.status;

  const schema = yup.object({
    newPassword: yup.string().required(`${translate('NEW_PASSWORD_REQUIRED')}`),
    confirmNewPassword: yup
      .string()
      .required(`${translate('CONFIRM_NEW_PASSWORD_REQUIRED')}`)
      .oneOf([yup.ref('newPassword'), null], `${translate('MATCH_PASSWORD')}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ChangePasswordProps) => changePassword(data);

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
            type="password"
            size="large"
            placeholder="**********"
            labelOptions={{
              text: translate('NEW_PASSWORD'),
            }}
            iconOptions={{
              icon: LockIcon,
            }}
            errorOptions={{
              message: errors.newPassword?.message,
            }}
            isRequired
            isLoading={isLoading}
            {...register('newPassword')}
          />

          <Input
            type="password"
            size="large"
            placeholder="**********"
            labelOptions={{
              text: translate('CONFIRM_NEW_PASSWORD'),
            }}
            iconOptions={{
              icon: LockIcon,
            }}
            errorOptions={{
              message: errors.confirmNewPassword?.message,
            }}
            isRequired
            isLoading={isLoading}
            {...register('confirmNewPassword')}
          />
        </div>

        <div className="mt-8">
          <Button type="submit" size="large" isLoading={isLoading} className="w-full font-bold uppercase">
            {translate('CONFIRM')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
