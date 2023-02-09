import { Avatar } from '@mui/material';
import { SetStateAction } from 'react';

import useI18n from '@hooks/use-i18n';
import { COMMENT, COMMENT_TYPE, UserProps } from '@types';

import Input from '../core/input';
import languages from './i18n';

interface PropsType {
  item: COMMENT;
  index: number;
  displayData: COMMENT[];
  user: UserProps | undefined;
  modify: number | null;
  setModify: React.Dispatch<SetStateAction<number | null>>;
  setHiddenPopup: React.Dispatch<SetStateAction<boolean>>;
}

const CommentItem = ({ item, index, displayData, user, modify, setModify, setHiddenPopup }: PropsType) => {
  const translate = useI18n(languages);

  const content = (el: COMMENT) => {
    if (typeof el.detail === 'string')
      if (el.id === modify)
        return (
          <div className="flex els-center">
            <div className="grow">
              <Input size="small" defaultValue={el.detail} />
            </div>
            <div className="flex gap-2 ml-2">
              <span className="px-4 py-1 text-sm cursor-pointer bg-primary text-light rounded-3xl">
                {translate('UPDATE')}
              </span>
              <span
                className="px-4 py-1 text-sm cursor-pointer bg-dark text-light rounded-3xl"
                onClick={() => setModify(null)}
              >
                {translate('CANCEL')}
              </span>
            </div>
          </div>
        );
      else return el.detail;
    return (
      <ul className="list-disc">
        {el.detail.map(change => (
          <li key={change}>{change}</li>
        ))}
      </ul>
    );
  };
  return (
    <div
      key={item.id}
      className={`py-4 flex ${index !== displayData.length - 1 && 'border-b border-b-secondary-dark'}`}
    >
      <div className="pr-3">
        <Avatar
          src=""
          sx={{
            width: 46,
            height: 46,
            background: 'bg-gray-300',
          }}
        />
      </div>
      <div className="grow">
        <div className="flex justify-between">
          <div className="font-bold">{item.name}</div>
          {user?.id === item.userID && modify !== item.id && item.type !== COMMENT_TYPE.EDIT && (
            <div className="flex items-center gap-2">
              <span
                className="px-4 py-1 text-sm cursor-pointer text-light bg-dark rounded-3xl"
                onClick={() => setModify(item.id)}
              >
                {translate('MODIFY')}
              </span>
              <span
                className="px-3 py-1 text-sm cursor-pointer text-light bg-dark rounded-3xl"
                onClick={() => setHiddenPopup(false)}
              >
                {translate('DELETE')}
              </span>
            </div>
          )}
        </div>
        <div className="text-dark">{item.time}</div>
        <div className="mt-2">{content(item)}</div>
      </div>
    </div>
  );
};

export default CommentItem;
