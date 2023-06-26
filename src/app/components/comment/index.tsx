// import moment from 'moment';
import { useState } from 'react';

import useI18n from '@hooks/use-i18n';
import { selectUserData, useAppSelector } from '@store';
import { COMMENT, COMMENT_TYPE } from '@types';

import languages from './i18n';
import CommentItem from './item';

const COMMENT_NUMBER = 5;

const Comment = ({
  data,
  onUpdate,
  onDelete,
}: {
  data: COMMENT[];
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}) => {
  const translate = useI18n(languages);

  const user = useAppSelector(selectUserData);

  const [page, setPage] = useState(COMMENT_TYPE.ALL);
  const [length, setLength] = useState(COMMENT_NUMBER);
  const [sort, setSort] = useState(true);
  const [modify, setModify] = useState<number | null>(null);

  const filteredData = data.filter((type: COMMENT) => {
    if (page === COMMENT_TYPE.ALL) return true;
    return type.type === page;
  });
  // .sort((a, b) => {
  //   return (
  //     moment(a.time, 'hh:mm DD/MM/YYYY').toDate().getTime() - moment(b.time, 'hh:mm DD/MM/YYYY').toDate().getTime()
  //   );
  // })
  // .reverse();

  let displayData = filteredData.slice(0, length);
  if (!sort) displayData = displayData.reverse();

  const filter = (type: COMMENT_TYPE, text: string) => (
    <div
      className={`px-5 py-1 rounded-3xl cursor-pointer ${page === type && 'bg-dark text-light text-sm'}`}
      onClick={() => {
        setPage(type);
        setLength(COMMENT_NUMBER);
      }}
    >
      {translate(text)}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between pb-2">
        <div>
          {translate('COMMENT')} ({filteredData.length})
        </div>

        <div className="flex items-center">
          {filter(COMMENT_TYPE.ALL, 'VIEW_ALL')}
          {filter(COMMENT_TYPE.COMMENT, 'COMMENT')}
          {filter(COMMENT_TYPE.EDIT, 'HISTORY')}
          <img
            src="/assets/icons/sort.svg"
            alt="sort icon"
            className={`ml-2 cursor-pointer ${!sort && 'transform -scale-x-100 rotate-180'}`}
            role="presentation"
            onClick={() => setSort(order => !order)}
          />
        </div>
      </div>

      <div className="flex flex-col p-4 bg-white border rounded border-secondary">
        {filteredData.length > COMMENT_NUMBER && (
          <div className="w-full border-b border-b-secondary">
            <button
              className={`-mt-1 pb-2 ${
                filteredData.length !== displayData.length ? 'text-primary' : 'text-gray-500 cursor-default'
              }`}
              onClick={() => setLength(n => n + COMMENT_NUMBER)}
              type="button"
            >
              {translate('MORE')}
            </button>
          </div>
        )}

        {displayData.length > 0 ? (
          displayData.map((item, index) => (
            <CommentItem
              key={item.id}
              item={item}
              index={index}
              displayData={displayData}
              user={user}
              modify={modify}
              setModify={setModify}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        ) : (
          <span className="text-sm text-gray-500">{translate('NO_COMMENTS_YET')}</span>
        )}
      </div>
    </div>
  );
};

export default Comment;
