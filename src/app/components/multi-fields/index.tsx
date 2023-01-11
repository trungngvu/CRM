import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, KeyboardEvent } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { FIELD_TYPE, SelectItem } from '@types';

import DatePicker from '../core/date-picker';
import Input from '../core/input';
import SelectHeadless from '../core/select-headless';
import SelectMultiple from '../core/select-multiple';

type DataField = {
  type: string;
  label: string;
  data?: SelectItem[];
  placeholder?: string;
  name: string;
  isRequire?: boolean;
  colSpan?: number | string;
};

type MultiFieldProps = {
  dataField: DataField[];
  control: Control<FieldValues>;
  errors?: FieldValues | undefined;
  onChangeEtm?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
  valueEtmTime?: string | undefined;
};

const { DATE, SELECT_MULTIPLE, SELECT_SEARCH, INPUT_SELECT, INPUT, SELECT } = FIELD_TYPE;

const MultiField = ({ dataField, control, errors, onChangeEtm, valueEtmTime }: MultiFieldProps) => {
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('taskId');

  const handleOnkeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === '+') {
      e.preventDefault();
    }
  };

  const handleSpcKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/^[^!-\-\-`{-~]+$/.test(e.key)) e.preventDefault();
  };

  return (
    <>
      {dataField?.map(({ type, label = '', placeholder = '', data = [], name, isRequire, colSpan = 1 }) => {
        switch (type) {
          case INPUT:
            return (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => {
                  return (
                    <div className={`col-span-${colSpan}`}>
                      <Input
                        size="large"
                        placeholder={placeholder}
                        isRequired={isRequire || false}
                        type={name === 'phone' ? 'number' : 'text'}
                        errorOptions={{
                          message: errors?.[name]?.message?.toString(),
                        }}
                        onKeyPress={e => handleSpcKey(e)}
                        maxLength={200}
                        labelOptions={{
                          text: label,
                        }}
                        {...field}
                      />
                    </div>
                  );
                }}
              />
            );

          case DATE:
            return (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => {
                  return (
                    <DatePicker
                      key={name}
                      fieldData={{ ...field }}
                      size="small"
                      placeholder={placeholder}
                      label={label}
                      errors={errors?.[name]}
                      isRequire={isRequire}
                    />
                  );
                }}
              />
            );

          case SELECT_SEARCH:
            return (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => {
                  return (
                    <div className="col-span-1 sm:col-span-2" key={name}>
                      <SelectHeadless
                        className=" m-[-1px] h-[42px]"
                        label={label}
                        isRequire={isRequire}
                        data={data}
                        fieldData={{ ...field }}
                        placeholder={placeholder}
                        errors={errors?.[name]}
                        icon={<SearchIcon />}
                        disable={!!taskId}
                      />
                    </div>
                  );
                }}
              />
            );

          case INPUT_SELECT:
            return (
              <div className="flex flex-col gap-y-2" key={name}>
                {label && (
                  <label htmlFor={label} className="flex select-none">
                    {label}
                    {isRequire && <p className="text-[red]">*</p>}
                  </label>
                )}
                <div className="flex justify-between w-[100%] h-[42px] border-[1px] border-solid border-secondary rounded-[4px] hover:border-[black] ">
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                      return (
                        <>
                          {onChangeEtm && (
                            <input
                              className="w-[75%] border-transparent focus:border-transparent focus:ring-0 rounded-[4px]"
                              type="number"
                              value={valueEtmTime}
                              placeholder="0"
                              onChange={e => onChangeEtm(e)}
                              min="0"
                              maxLength={3}
                              onKeyPress={e => handleOnkeyPress(e)}
                            />
                          )}
                          <SelectHeadless
                            errors={errors?.[name]}
                            fieldData={{ ...field }}
                            withoutBorder
                            className="w-[100px] h-[26px] my-[7px]"
                            data={data}
                            placeholder={placeholder || data[0].label}
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            );

          case SELECT_MULTIPLE:
            return (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => {
                  return (
                    <div className={`col-span-${colSpan}`}>
                      <SelectMultiple
                        errors={errors?.[name]}
                        data={data}
                        fieldData={{ ...field }}
                        placeholder={placeholder || data[0]?.label}
                        label={label}
                        isRequire={isRequire || false}
                      />
                    </div>
                  );
                }}
              />
            );

          case SELECT:
            return (
              <Controller
                name={name}
                key={name}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectHeadless
                      errors={errors?.[name]}
                      data={data}
                      key={name}
                      className=" m-[-1px] h-[42px]"
                      fieldData={{ ...field }}
                      placeholder={placeholder || data[0]?.label}
                      label={label}
                      isRequire={isRequire}
                    />
                  );
                }}
              />
            );

          default:
            throw new Error('error');
        }
      })}
    </>
  );
};

export default MultiField;
