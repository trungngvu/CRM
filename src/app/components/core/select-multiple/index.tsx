import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, TextField } from '@mui/material';
import { ControllerRenderProps, FieldError, FieldErrorsImpl, FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { COLORS, SelectItem } from '@types';

import { CloseIcon } from '../icons';

const { ERROR, DARK, SECONDARY } = COLORS;

type SelectMultipleProps = {
  size?: 'small' | 'medium';
  data?: SelectItem[];
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
  const onChangeSelect = (_event: object, value: Array<SelectItem>) => {
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
        borderColor: errors && ERROR,
      },
    },
    '& .MuiChip-root': {
      borderRadius: '3px',
      border: `1px solid ${SECONDARY}`,
      minHeight: '30px !important',
      fontSize: '14px',
    },
    '& .MuiInputBase-root': {
      paddingTop: '3px !important',
      paddingBottom: '3px !important',
      paddingLeft: '3px !important',
      minHeight: '40px ',
    },
  };

  return (
    <div className={twMerge('flex flex-col gap-y-2', className)}>
      {label && (
        <label htmlFor={label} className="flex select-none">
          {label}
          {isRequire && <p className="ml-1 text-error">*</p>}
        </label>
      )}
      <Autocomplete
        multiple
        options={data}
        value={fieldData?.value || []}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        size={size}
        ChipProps={{
          deleteIcon: <CloseIcon size={15} color={DARK} />,
        }}
        filterSelectedOptions
        className="min-w-[300px]"
        onChange={onChangeSelect}
        popupIcon={<KeyboardArrowDownIcon />}
        renderInput={(params: object) => (
          <TextField placeholder={fieldData?.value?.length > 0 ? '' : placeholder} sx={styles} {...params} />
        )}
      />
      {errors && <p className="text-sm text-error">{errors?.message?.toString()}</p>}
    </div>
  );
};

export default SelectMultiple;
