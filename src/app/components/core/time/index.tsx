import Moment, { MomentProps } from 'react-moment';

import { DATE_FORMAT } from '@configs';

type TimeProps = {
  children: string | number | Date;
} & MomentProps;

const INVALID_DATE = 'Invalid date';

const filter = (date: string) => {
  if (date === INVALID_DATE) {
    return '';
  }

  return date;
};

const Time = ({ format = DATE_FORMAT, children, ...props }: TimeProps) => (
  <Moment filter={filter} format={format} {...props}>
    {children}
  </Moment>
);

export default Time;
