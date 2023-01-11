import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ControllerRenderProps, FieldError, FieldValues } from 'react-hook-form';

import { DATE_FORMAT } from '@configs';
import { COLORS } from '@types';

const { ERROR } = COLORS;

type DatePickerType = {
  placeholder?: string | null;
  className?: string;
  label?: string;
  size?: 'small' | 'medium';
  fieldData: ControllerRenderProps<FieldValues, string>;
  errors?: FieldError | undefined;
  isRequire?: boolean | undefined;
};

const DatePicker = ({
  size = 'medium',
  placeholder,
  className,
  label,
  fieldData,
  errors,
  isRequire,
}: DatePickerType) => {
  const styles = {
    '& .MuiInputBase-input': {
      boxShadow: 'none',
      borderColor: 'transparent',
      outlineColor: 'transparent',
      offset: 'none',
      paddingLeft: '8px',
    },
    backgroundColor: 'white',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: errors && ERROR,
      },
    },
    '& .MuiButtonBase-root': {
      position: 'absolute',
      right: '18px',
      padding: 0,
    },
  };

  return (
    <div className="flex flex-col gap-y-2">
      {label && (
        <label htmlFor={label} className="flex select-none">
          {label}
          {isRequire && <p className="ml-1 text-red-500">*</p>}
        </label>
      )}

      <div className={className}>
        <DesktopDatePicker
          inputFormat={DATE_FORMAT}
          label={null}
          {...fieldData}
          value={fieldData.value ? fieldData.value : null}
          renderInput={params => (
            <TextField
              {...params}
              size={size}
              inputProps={{
                ...params.inputProps,
                placeholder: placeholder?.toString(),
              }}
              sx={styles}
            />
          )}
        />
      </div>

      {errors && <p className="text-sm text-error">{errors?.message}</p>}
    </div>
  );
};

export default DatePicker;
