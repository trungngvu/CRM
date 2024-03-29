import { clsx } from 'clsx';

import Button from '../../button';
import { AddIcon } from '../../icons';

type TableTitleProps = {
  title: string | JSX.Element | undefined;
  buttonContent: string | undefined;
  buttonAction: (() => void) | undefined;
};

const TableTitle = ({ title, buttonContent, buttonAction }: TableTitleProps): JSX.Element => (
  <div
    className={clsx(
      {
        'justify-end': !title,
        'justify-between': title,
      },
      'flex items-center'
    )}
  >
    {title && <div className="font-bold">{title}</div>}

    {buttonContent && (
      <Button
        shape="round"
        iconOptions={{
          icon: AddIcon,
          size: 20,
        }}
        onClick={buttonAction}
      >
        {buttonContent}
      </Button>
    )}
  </div>
);

export default TableTitle;
