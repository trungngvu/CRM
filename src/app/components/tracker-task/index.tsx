import { useEffect, useState } from 'react';

import { DataDisplay } from '@components/popups/popup-add-member';
import { useI18n } from '@hooks';

import languages from './i18n';

type TrackerTaskPropsType = {
  listUser: DataDisplay[];
  handleOpen?: () => void;
  handleRemoveUser: (id: string | number) => void;
};

const TrackerTask = ({ listUser, handleOpen, handleRemoveUser }: TrackerTaskPropsType) => {
  const [data, setData] = useState<DataDisplay[]>(listUser);

  useEffect(() => {
    setData(listUser);
  }, [listUser]);

  const translate = useI18n(languages);

  return (
    <div className=" bg-white rounded-[4px] mt-4 p-3  border-solid border-[1px] border-secondary-dark">
      <div className="font-semibold ">{translate('TRACKER_TASK')}</div>

      <div className="flex flex-wrap">
        {data.map(item => (
          <div key={item.id} className="flex items-center my-2 mr-3">
            <div className="text-dark pr-[7px]">{item.name}</div>

            <div className="flex items-center" onClick={() => handleRemoveUser(item.id)}>
              <img className="cursor-pointer" src="/assets/icons/cancel.svg" alt="cancel" />
            </div>
          </div>
        ))}
      </div>
      <div onClick={handleOpen} className="flex items-center mt-2 cursor-pointer">
        <img className="h-[20px]" src="/assets/icons/add_circle_blue.svg" alt="add" />
        <span className="pl-1 font-normal text-primary">{translate('ADD_MEMBER')}</span>
      </div>
    </div>
  );
};

export default TrackerTask;
