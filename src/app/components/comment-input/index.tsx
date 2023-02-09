import SendIcon from '@mui/icons-material/Send';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import useI18n from '@hooks/use-i18n';

import Input from '../core/input';
import languages from './i18n';

const CommentInput = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const translate = useI18n(languages);

  return (
    <div className="sticky bottom-0 w-full px-2 py-2 bg-white">
      <Input value={inputValue} onChange={handleOnChangeValue} placeholder={`${translate('CONTENT')}`} />
      <SendIcon
        className={twMerge(
          clsx('absolute -translate-y-8 cursor-pointer right-5 opacity-40', {
            'hover:text-blue-600 hover:opacity-100': inputValue === '',
            'opacity-100 text-blue-600': inputValue !== '',
          })
        )}
      />
    </div>
  );
};

export default CommentInput;
