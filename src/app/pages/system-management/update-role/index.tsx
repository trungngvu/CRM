import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Input, Loading, OptionsNav, SelectHeadless, Table } from '@components';
import { SaveIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import { useGetPermissionsQuery, useGetRoleByIdQuery, useUpdateRoleMutation } from '@store';
import { ACTIVE_STATUS, PAGES, UpdateRoleProps } from '@types';

import languages from './i18n';

const { ACTIVE, DEACTIVATED } = ACTIVE_STATUS;

type Item = {
  id: number;
  name: string;
  description: string;
};

const UpdateRole = (): JSX.Element => {
  const { data: permissions, isLoading: isLoadingPermission } = useGetPermissionsQuery();
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get('id');
  const roleDetail = useGetRoleByIdQuery({ id: roleId }, { refetchOnMountOrArgChange: true }).data;
  const navigate = useNavigate();

  const [updateRole, { isLoading, isSuccess, isError }] = useUpdateRoleMutation();

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [permissionList, setPermissionList] = useState<Item[]>([]);

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

  const roleTableData = (roleDetail?.permissions || []).map(item => {
    return {
      id: item.id,
      name: translate(item.name),
      description: translate(item.name),
    };
  });

  const schema = Yup.object({
    name: Yup.string().required(translate('NAME_REQUIRED_ROLE').toString()),
    status: Yup.object().nullable().required(translate('STATUS_REQUIRED_ROLE').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: roleId,
    },
  });

  useEffect(() => {
    if (roleDetail) {
      setValue('name', roleDetail.name);
      setValue('status', {
        value: roleDetail.status,
        label: translate(roleDetail.status),
      });
      setPermissionList(roleTableData);
      setDescription(roleDetail.description);
    }
  }, [roleDetail]);

  const handleOnClickReturn = (): void => {
    navigate(PAGES.ROLE_LIST);
  };

  const onSubmit = (data: FieldValues) => {
    if (Object.values(errors).some(error => error) || description.trim() === '') {
      if (description.trim() === '') setDescriptionError(translate('DESCRIPTION_REQUIRED_ROLE'));
      return;
    }
    const postData = {
      id: data.id,
      name: data.name,
      description: data.description,
      status: data.status.value,
      permissions: permissionList.map(item => item.id),
    };
    updateRole(postData as UpdateRoleProps);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(PAGES.ROLE_LIST);
      toast.success(translate('UPDATE_ROLE_SUCCESS'));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(translate('UPDATE_ROLE_FAIL'));
  }, [isError]);

  useEffect(() => {
    if (description.trim() !== '') setDescriptionError('');
    if (description.trim() === '' && descriptionError !== null)
      setDescriptionError(translate('DESCRIPTION_REQUIRED_ROLE'));
  }, [description]);

  const onChangeDsc = (_: Event, editor: typeof ClassicEditor): void => {
    setDescription(editor.getData());
  };

  const permissionsList = (permissions?.data || []).map(item => {
    return {
      id: item.id,
      name: translate(item.name),
      description: translate(item.name),
    };
  });

  if (isLoadingPermission) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <OptionsNav
          className="mb-3"
          onClickReturn={handleOnClickReturn}
          title={translate('EDIT')}
          options={
            <Button
              isLoading={isLoading}
              type="submit"
              iconOptions={{
                icon: SaveIcon,
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
              rootData: permissionList,
            }}
            selectOptions={{
              display: true,
              selectedList: permissionList,
              setSelectList: setPermissionList,
            }}
            columns={columns}
            data={permissionsList}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateRole;
