import Moment, { MomentProps } from 'react-moment';

import { DATE_FORMAT } from '@configs';

type TimeProps = {
  children: string;
} & Omit<MomentProps, 'children'>;

const INVALID_DATE = 'Invalid date';

const filter = (date: string) => {
  if (date === INVALID_DATE) {
    return '';
  }

  return date;
};

const Time = ({ format = DATE_FORMAT, children, ...props }: TimeProps) => {
  const date = new Date(Date.parse(children));

  return (
    <Moment filter={filter} format={format} {...props}>
      {date}
    </Moment>
  );
};

export default Time;
