import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type TagsListProps = {
  className?: string;
  data: {
    title: string;
    tags: {
      name: string;
      url: string;
    }[];
  }[];
  titleClass?: string;
};

const TagsList = ({ className, data = [], titleClass }: TagsListProps): JSX.Element => {
  return (
    <div
      className={twMerge(
        'flex flex-col w-full py-[15px] px-[17px] border border-secondary-light rounded-[5px] bg-white gap-y-[17px]',
        className
      )}
    >
      {data.map(item => (
        <div key={item.title} className="flex items-center justify-start">
          <div className={twMerge('min-w-max mr-2', titleClass)}>{item.title}:</div>
          <div className="flex flex-wrap gap-x-[8px] gap-y-[6px] w-full">
            {item.tags.map(tag => {
              return (
                <Link key={tag.name} to={tag.url}>
                  <div className="bg-secondary-extraLight text-primary rounded-[3px] pl-[8px] pb-[8px] pt-[6px] pr-[7px] cursor-pointer h-[32px] flex items-center justify-center">
                    <span className="translate-y-px">{tag.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagsList;
