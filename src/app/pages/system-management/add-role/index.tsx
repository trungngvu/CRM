import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Input, Loading, OptionsNav, SelectHeadless, Table } from '@components';
import { SaveIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import { useCreateRoleMutation, useGetPermissionsQuery } from '@store';
import { ACTIVE_STATUS, CreateRoleProps, PAGES } from '@types';

import languages from './i18n';

const { ACTIVE, DEACTIVATED } = ACTIVE_STATUS;

type Item = {
  id: number;
  name: string;
  description: string;
};

const AddRole = (): JSX.Element => {
  const { data: permissions, isLoading: isLoadingPermission } = useGetPermissionsQuery();
  const navigate = useNavigate();

  const [createRole, { isLoading, isSuccess, isError }] = useCreateRoleMutation();

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [permissionsList, setPermissionsList] = useState<Item[]>([]);

  const translate = useI18n(languages);

  const columns = [
    {
      label: translate('FUNCTION_NAME'),
      value: 'name',
    },
    {
      label: translate('DESCRIPTION'),
      value: 'description',
    },
  ];

  const schema = Yup.object({
    name: Yup.string().required(translate('NAME_REQUIRED_ROLE').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      status: ACTIVE,
    },
  });

  const handleOnClickReturn = (): void => {
    navigate(PAGES.ROLE_LIST);
  };

  const onSubmit = (data: FieldValues) => {
    if (Object.values(errors).some(error => error) || description.trim() === '') {
      if (description.trim() === '') setDescriptionError(translate('DESCRIPTION_REQUIRED_ROLE'));
      return;
    }
    const postData = {
      name: data.name,
      description,
      status: data.status.value,
      permissions: permissionsList.map(item => item.id),
    };
    createRole(postData as CreateRoleProps);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(PAGES.ROLE_LIST);
      toast.success(translate('ADD_ROLE_SUCCESS'));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('ADD_ROLE_FAIL'));
  }, [isError]);

  useEffect(() => {
    if (description.trim() !== '') setDescriptionError('');
    if (description.trim() === '' && descriptionError !== null)
      setDescriptionError(translate('DESCRIPTION_REQUIRED_ROLE'));
  }, [description]);

  const onChangeDsc = (_: Event, editor: typeof ClassicEditor): void => {
    setDescription(editor.getData());
  };

  const permissionsData = (permissions?.data || []).map(item => {
    return {
      id: item?.id,
      name: translate(item?.name),
      description: translate(item?.name),
    };
  });

  if (isLoadingPermission) {
    return <Loading />;
  }

  return (
    <div className="p-4 min-h-[calc(100vh-58px)]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <OptionsNav
          className="mb-3"
          onClickReturn={handleOnClickReturn}
          title={translate('ADD')}
          options={
            <Button
              isLoading={isLoading}
              type="submit"
              iconOptions={{
                icon: SaveIcon,
                position: 'left',
                color: 'white',
                size: 20,
              }}
              shape="round"
              className="w-full"
            >
              {translate('SAVE')}
            </Button>
          }
        />
        <div className="p-4 mb-4 border border-secondary-light rounded-[5px] bg-white">
          <div className="flex mb-3">
            <div className="grow-[2] mr-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      labelOptions={{
                        text: translate('PERMISSION_NAME'),
                      }}
                      isRequired
                      {...field}
                      errorOptions={{
                        message: errors.name?.message?.toString(),
                      }}
                      maxLength={200}
                    />
                  );
                }}
              />
            </div>
            <div className="grow-[1]">
              <Controller
                name="status"
                control={control}
                render={({ field }) => {
                  return (
                    <SelectHeadless
                      data={[
                        { label: translate('ACTIVE'), value: ACTIVE },
                        { label: translate('DEACTIVATED'), value: DEACTIVATED },
                      ]}
                      className="h-[40px]"
                      label={translate('STATUS')}
                      placeholder={translate('ACTIVE').toString()}
                      isRequire
                      fieldData={{ ...field }}
                      errors={errors.status}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="mb-[6px]">
              {translate('DESCRIPTION')}
              <span className="text-error"> *</span>
            </p>
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={onChangeDsc}
                config={{ autoGrow_onStartup: 'True', toolbarLocation: 'bottom' }}
              />
            </div>
            {descriptionError !== null && descriptionError !== '' && (
              <div className="text-sm text-error">{descriptionError}</div>
            )}
          </div>
        </div>
        <div>
          <Table
            headerOptions={{
              title: `${translate('FUNCTION_LIST')}`,
            }}
            searchOptions={{
              display: true,
              searchByValue: 'name',
              rootData: permissionsData,
            }}
            selectOptions={{
              display: true,
              selectedList: permissionsList,
              setSelectList: setPermissionsList,
            }}
            columns={columns}
            data={permissionsData}
          />
        </div>
      </form>
    </div>
  );
};

export default AddRole;
