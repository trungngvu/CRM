import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';

import useI18n from '@hooks/use-i18n';

import languages from './i18n';

export interface PropTypes {
  id: number;
  name: string;
  date: string;
  duration: number;
  title: string;
  detail?: string;
}

const JobHistory = ({ data }: { data: PropTypes[] }) => {
  const translate = useI18n(languages);

  return (
    <div className="w-full bg-white border rounded border-secondary">
      <div className="px-4 py-2 font-bold border-b border-b-secondary">
        <div>{translate('title')}</div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        {data.length > 0 ? (
          data?.map((job, index) => (
            <div
              key={job.id}
              className={`py-3 flex flex-col gap-2 ${!(index === data.length - 1) && 'border-b'} border-b-secondary`}
            >
              <div>
                {translate('updateBy')} <span className="mx-1 text-blue-500">{job.name}</span> <span>{job.date}</span>
              </div>
              <div className="flex flex-col gap-1 px-3">
                <div>
                  <AccessTimeIcon />
                  <span className="ml-2 font-bold">{job.duration}h</span>
                </div>
                <div>
                  <EditIcon />
                  <span className="ml-2">{job.title}</span>
                </div>
                {job.detail && (
                  <div>
                    <CommentIcon />
                    <span className="ml-2">{job.detail}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <span className="my-2 text-sm text-gray-500">{translate('NO_DATA')}</span>
        )}
      </div>
    </div>
  );
};

export default JobHistory;
