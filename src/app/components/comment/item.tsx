import { Avatar } from '@mui/material';
import { SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

import { PopupDelete } from '@components';
import useI18n from '@hooks/use-i18n';
import useModal from '@src/app/hooks/use-modal';
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
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const CommentItem = ({ item, index, displayData, user, modify, setModify, onUpdate, onDelete }: PropsType) => {
  const translate = useI18n(languages);
  const [value, setValue] = useState(item.detail);
  const { open, close, Popup } = useModal();

  const handleDeleteComment = () => {
    close();
    onDelete(item.id);
    toast.success(translate('DELETE_TASK_TOASTIFY'), {
      autoClose: 4000,

      pauseOnHover: false,
    });
  };

  const content = (el: COMMENT) => {
    if (typeof el.detail === 'string')
      if (el.id === modify)
        return (
          <div className="flex els-center">
            <div className="grow">
              <Input size="small" value={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div className="flex gap-2 ml-2">
              <span
                className="px-4 py-1 text-sm cursor-pointer bg-primary text-light rounded-3xl"
                onClick={() => {
                  onUpdate(el.id, value.toString());
                  setModify(null);
                }}
              >
                {translate('UPDATE')}
              </span>
              <span
                className="px-4 py-1 text-sm cursor-pointer bg-dark text-light rounded-3xl"
                onClick={() => {
                  setModify(null);
                }}
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
      <Popup>
        <PopupDelete
          onSubmit={handleDeleteComment}
          onCancel={close}
          header={translate('DELETE_COMMENT_CONFIRM')}
          content={translate('DELETE_COMMENT_CONFIRM_QUESTION')}
        />
      </Popup>
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
              <span className="px-3 py-1 text-sm cursor-pointer text-light bg-dark rounded-3xl" onClick={() => open()}>
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
