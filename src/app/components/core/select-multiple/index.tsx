import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, TextField } from '@mui/material';
import { ControllerRenderProps, FieldError, FieldErrorsImpl, FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { ItemType } from '../select-headless';

type SelectMultipleProps = {
  size?: 'small' | 'medium';
  data?: ItemType[];
  placeholder?: string;
  fieldData?: ControllerRenderProps<FieldValues, string>;
  errors?: FieldError | undefined | FieldErrorsImpl;
  label?: string;
  isRequire?: boolean;
  className?: string;
};

const SelectMultiple = ({
  size = 'small',
  label,
  isRequire,
  placeholder = '',
  fieldData,
  errors,
  data = [],
  className,
}: SelectMultipleProps) => {
  const onChangeSelect = (_event: object, value: Array<ItemType>) => {
    fieldData?.onChange(value);
  };

  const styles = {
    '& .MuiInputBase-input': {
      boxShadow: 'none',
      borderColor: 'transparent',
      outlineColor: 'transparent',
      offset: 'none',
      '&.focused': {
        outline: 'none',
        border: 'none',
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: errors && '#EF4444',
      },
    },
    '& .MuiChip-root': {
      borderRadius: '3px',
      border: '1px solid #D5D8DD',
    },
  };

  return (
    <div className={twMerge('flex flex-col gap-y-2', className)}>
      {label && (
        <label htmlFor={label} className="flex select-none">
          {label}
          {isRequire && <p className="ml-1 text-red-500">*</p>}
        </label>
      )}
      <Autocomplete
        multiple
        options={data}
        value={fieldData?.value || []}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        size={size}
        className="min-w-[300px]"
        onChange={onChangeSelect}
        popupIcon={<KeyboardArrowDownIcon />}
        renderInput={(params: object) => (
          <TextField placeholder={fieldData?.value?.length > 0 ? '' : placeholder} sx={styles} {...params} />
        )}
      />
      {errors && <p className="text-sm text-red-500">{errors?.message?.toString()}</p>}
    </div>
  );
};

export default SelectMultiple;
