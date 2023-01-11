import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { selectDisplaySetting, settingsActions, useAppDispatch, useAppSelector } from '@store';
import { PAGES } from '@types';

import Item from './item';

type MenuProps = {
  data: {
    name: string;
    path: string;
    icon: JSX.Element;
    subs?: {
      name: string;
      path: string;
    }[];
  };
};

const Menu = ({ data, data: { path, subs } }: MenuProps): JSX.Element => {
  const [isExpand, setIsExpand] = useState(false);

  const { pathname } = useLocation();
  const { expandNavbar } = useAppSelector(selectDisplaySetting);
  const dispatch = useAppDispatch();

  const toggleExpand = () => {
    if (!expandNavbar) {
      dispatch(settingsActions.toggleNavbar());
    }

    setIsExpand(value => !value);
  };

  /**
   * Expand item if sub menu include in path name
   */
  useEffect(() => {
    if (subs?.map(value => value.path).includes(pathname)) {
      setIsExpand(true);
    }
  }, [expandNavbar]);

  return (
    <div className="flex flex-col">
      <Item
        data={data}
        isParent
        isExpand={isExpand}
        active={(pathname.includes(path) && path !== PAGES.HOME) || (pathname === PAGES.HOME && path === PAGES.HOME)}
        onClick={subs && subs.length > 0 ? toggleExpand : null}
      />

      {subs && subs.length > 0 && expandNavbar && isExpand && (
        <div className="flex flex-col whitespace-nowrap gap-y-[5px] mt-[5px]">
          {subs.map(sub => {
            const pathWithoutQuery = sub.path.split('?')[0];

            return <Item key={sub.name} data={sub} active={pathname.includes(pathWithoutQuery)} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
