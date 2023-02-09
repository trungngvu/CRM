import { Avatar } from '@mui/material';
import { DefaultTFuncReturn } from 'i18next';

import useI18n from '@hooks/use-i18n';
import { UserProps } from '@types';

import languages from './i18n';

type CardDetailProps = {
  data: {
    startDate?: string | JSX.Element;
    startTime?: string | JSX.Element;
    projectOwner?: UserProps | string;
    projectManager?: string[] | string;
    projectProcess?: string;
    projectInfo?: string | undefined;
    avatarSrc?: string;
    taskEstimate?: string | JSX.Element | DefaultTFuncReturn;
    taskPriority?: string | JSX.Element | DefaultTFuncReturn;
    taskAssigner?: string | JSX.Element | DefaultTFuncReturn;
  };
};

const CardDetail = ({
  data: {
    startDate,
    startTime,
    projectOwner,
    projectManager,
    projectInfo,
    avatarSrc,
    taskEstimate,
    taskPriority,
    projectProcess,
    taskAssigner,
  },
}: CardDetailProps) => {
  const translate = useI18n(languages);

  return (
    <div className="p-4 bg-white border rounded border-secondary">
      <div className="flex items-center mb-3">
        <div className="mr-2">
          <Avatar
            src={avatarSrc || ''}
            sx={{
              width: 46,
              height: 46,
              background: 'bg-gray-300',
            }}
          />
        </div>

        <div className="flex flex-col justify-center">
          <h4 className="font-bold">{projectOwner?.toString()}</h4>
          {/* <h4 className="font-bold">{projectName}</h4> */}

          <p className="text-sm text-dark">
            {startTime} {startTime && startDate && '-'} {startDate}
          </p>
        </div>
      </div>

      <div
        className="pb-4 mb-4 border-b border-secondary ck-content"
        dangerouslySetInnerHTML={{ __html: `<div>${projectInfo}</div>` }}
      />

      <div className="flex">
        {startDate !== 'undefined' && startDate && (
          <div className="mr-14">
            {translate('START_DATE')}: <span className="font-bold">{startDate}</span>
          </div>
        )}

        {projectManager !== 'undefined' && projectManager && (
          <div className="mr-14">
            {translate('PROJECT_MANAGER')}: <span className="font-bold">{projectManager}</span>
          </div>
        )}

        {taskAssigner !== 'undefined' && taskAssigner && (
          <div className="mr-14">
            {translate('TASK_ASSIGNER')}: <span className="font-bold">{taskAssigner}</span>
          </div>
        )}

        {taskEstimate !== 'undefined' && taskEstimate && (
          <div className="mr-14">
            {translate('TASK_ESTIMATE')}: <span className="font-bold">{taskEstimate}</span>
          </div>
        )}

        {taskPriority !== 'undefined' && taskPriority && (
          <div className="mr-14">
            {translate('TASK_PRIORITY')}: <span className="font-bold">{taskPriority}</span>
          </div>
        )}

        {projectProcess !== 'undefined' && projectProcess && (
          <div className="mr-14">
            {translate('TASK_PROCESS')}: <span className="font-bold">{projectProcess}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetail;
