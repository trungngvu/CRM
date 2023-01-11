import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, Input, ProjectManagerNav, SelectHeadless, Table } from '@components';
import { SaveIcon } from '@src/app/components/core/icons';
import { ItemType } from '@src/app/components/core/select-headless';
import useI18n from '@src/app/hooks/use-i18n';
import { useCreateRoleMutation } from '@src/app/store';
import { LANGUAGES, PAGES, USER_GROUP_STATUS } from '@types';

import { en, vi } from './i18n';

type Item = {
  id: number;
  name: string;
  description: string;
};

const AddRole = (): JSX.Element => {
  const navigate = useNavigate();

  const [createRole, { isLoading, isSuccess, isError }] = useCreateRoleMutation();

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [roleList, setRoleList] = useState<Item[]>([]);

  const [status, setStatus] = useState<ItemType>({
    value: '',
    label: '',
  });

  const translate = useI18n({
    name: AddRole.name,
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

  const tableData = [
    {
      name: 'Chức năng 1',
      description: 'Lorem1',
    },
    {
      name: 'Chức năng 2',
      description: 'Lorem2',
    },
    {
      name: 'Chức năng 3',
      description: 'Lorem3',
    },
  ];

  const schema = Yup.object({
    name: Yup.string().required(translate('NAME_REQUIRED_ROLE').toString()),
    status: Yup.object().nullable().required(translate('STATUS_REQUIRED_ROLE').toString()),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      status: '',
    },
  });

  const handleOnClickReturn = (): void => {
    navigate(PAGES.ROLE_LIST);
  };

  const onSubmit = (data: FieldValues): void => {
    if (Object.values(errors).some(error => error) || description.trim() === '') {
      if (description.trim() === '') setDescriptionError(translate('DESCRIPTION_REQUIRED_ROLE'));
      return;
    }
    data.description = description;
    data.status = data.status.value;
    createRole(data as FormData);
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

  const onStatusChange = (value: ItemType): void => {
    setStatus(value);
  };

  return (
    <div className="p-4 min-h-[calc(100vh-58px)]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProjectManagerNav
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
              onClick={onSubmit}
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
                        { label: translate('ACTIVE'), value: `${USER_GROUP_STATUS.ACTIVE}` },
                        { label: translate('DEACTIVATE'), value: `${USER_GROUP_STATUS.DEACTIVATE}` },
                      ]}
                      className="h-[40px]"
                      label={translate('STATUS')}
                      isRequire
                      onChangeValue={onStatusChange}
                      selected={status}
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
              <span className="text-red-500"> *</span>
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
              <div className="text-sm text-red-500">{descriptionError}</div>
            )}
          </div>
        </div>
        <div>
          <Table<Item>
            headerOptions={{
              title: `${translate('FUNCTION_LIST')}`,
            }}
            searchOptions={{
              display: true,
              searchByValue: 'name',
              searchData: tableData,
            }}
            selectOptions={{
              display: true,
              selectedList: roleList,
              onChangeSelectedList: setRoleList,
            }}
            columns={columns}
            data={tableData.map((item, index) => {
              return {
                id: index,
                name: item.name,
                description: item.description,
              };
            })}
          />
        </div>
      </form>
    </div>
  );
};

export default AddRole;
