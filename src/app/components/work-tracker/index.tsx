import { DefaultTFuncReturn } from 'i18next';

import Button from '../core/button';

type WorkTrackerProps = {
  members: {
    name: string;
  }[];
  title: string | number | DefaultTFuncReturn;
};

const WorkTracker = ({ members, title }: WorkTrackerProps): JSX.Element => (
  <div className="flex flex-col px-4 pt-2.5 pb-3.5 bg-white border rounded border-secondary">
    <h4 className="pb-3 text-base">{title}</h4>

    <div className="flex items-center justify-start mb-2.5 flex-wrap">
      {members.map(member => (
        <Button color="secondary" key={member.name} className="my-1 mr-3" shape="round">
          {member.name}
        </Button>
      ))}
    </div>
  </div>
);

export default WorkTracker;
