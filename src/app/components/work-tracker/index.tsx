import { DefaultTFuncReturn } from 'i18next';

import { AddIcon, CloseIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import { LANGUAGES } from '@types';

import Button from '../core/button';
import { en, vi } from './i18n';

type WorkTrackerProps = {
  members: {
    name: string;
  }[];
  title: string | number | DefaultTFuncReturn;
  editable?: boolean;
};

const WorkTracker = ({ members, title, editable = false }: WorkTrackerProps): JSX.Element => {
  const translate = useI18n({
    name: WorkTracker.name,
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
  const handleRemoveMember = () => {
    console.log('remove member');
  };
  const handleAddMember = () => {
    console.log('add member');
  };
  return (
    <div className="flex flex-col px-4 pt-2.5 pb-3.5 bg-white border rounded border-secondary">
      <h4 className="pb-3 text-base">{title}</h4>
      <div className="flex items-center justify-start mb-2.5 flex-wrap">
        {editable &&
          members.map(member => (
            <Button
              key={member.name}
              className="my-1 mr-3"
              iconOptions={{
                icon: CloseIcon,
              }}
              shape="round"
              color="action"
              onClick={handleRemoveMember}
            >
              {member.name}
            </Button>
          ))}
        {!editable &&
          members.map(member => (
            <Button color="secondary" key={member.name} className="my-1 mr-3" shape="round">
              {member.name}
            </Button>
          ))}
      </div>
      {editable && (
        <Button
          color="primary"
          shape="round"
          iconOptions={{
            icon: AddIcon,
          }}
          onClick={handleAddMember}
          className="w-max"
        >
          {translate('ADD_MEMBER')}
        </Button>
      )}
    </div>
  );
};

export default WorkTracker;
