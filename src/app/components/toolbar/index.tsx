import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { MENUS, SETTINGS_CONFIG } from '@configs';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import {
  selectDisplaySetting,
  selectLayoutSetting,
  settingsActions,
  useAppDispatch,
  useAppSelector,
  useGetProjectsQuery,
} from '@store';
import { COLORS, LANGUAGES, PAGES, SelectItem } from '@types';

import { Icon, MenuIcon } from '../core/icons';
import SelectHeadless from '../core/select-headless';
import { en, vi } from '../navbar/menus/menu/item/i18n';
import UserMenu from '../user-menu';

const { NAVBAR_SIZE, EXPAND_NAVBAR_SIZE, TOOLBAR_HEIGHT } = SETTINGS_CONFIG;
const { DARK } = COLORS;

const Toolbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentLayoutSettings = useAppSelector(selectLayoutSetting);
  const { expandNavbar } = useAppSelector(selectDisplaySetting);

  const { pathname } = useLocation();
  const translate = useI18n({
    name: Toolbar.name,
    data: [
      {
        key: LANGUAGES.EN,
        value: en,
      },
      {
        key: LANGUAGES.VI,
        value: vi,
      },
    ],
  });

  const parentMenu = MENUS.find(menu => menu.path && pathname.includes(menu.path));

  const toggleNavbar = () => dispatch(settingsActions.toggleNavbar());

  const { data, isLoading } = useGetProjectsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [displayData, setDisplayData] = useState<SelectItem[]>([
    {
      value: '',
      label: '',
    },
  ]);
  const [selected, setSelected] = useState<SelectItem>({
    value: '',
    label: '',
  });
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const projectId = searchParams.get('projectId');

  const isShowSelectProject = pathname.includes('project/detail');
  const isShowSelectTask = pathname.includes('task');

  useEffect(() => {
    if (data) {
      setDisplayData(
        data.data.map(item => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (id) {
      const dataSelected = displayData.find(item => item.value === +id);
      if (dataSelected) setSelected(dataSelected);
    }
    if (projectId) {
      const dataSelected = displayData.find(item => item.value === +projectId);
      if (dataSelected) setSelected(dataSelected);
    }
  }, [displayData, id, projectId]);

  const handleSelect = (item: SelectItem) => {
    if (item.value && displayData.includes(item)) {
      if (isShowSelectProject) {
        history.push(`${PAGES.PROJECT_DETAIL}?id=${item.value}`);
      }
      if (isShowSelectTask) {
        history.push(`${PAGES.TASK_LIST}?projectId=${item.value}`);
      }
    }
  };

  return (
    <div
      style={{
        height: TOOLBAR_HEIGHT,
        minHeight: TOOLBAR_HEIGHT,
        maxHeight: TOOLBAR_HEIGHT,
        width: expandNavbar ? `calc(100% - ${EXPAND_NAVBAR_SIZE})` : `calc(100% - ${NAVBAR_SIZE})`,
      }}
      className={clsx(
        {
          '!w-full': !currentLayoutSettings.navbar,
        },
        'bg-white px-4 py-[10px] flex items-center shadow-2 z-[99] fixed'
      )}
    >
      <Icon icon={MenuIcon} onClick={toggleNavbar} color={DARK} size={20} />

      <div className="text-xl font-semibold">
        {isShowSelectProject || isShowSelectTask ? (
          <SelectHeadless
            className="w-[350px]"
            withoutBorder
            selectHeader
            data={displayData}
            selected={selected}
            onChangeValue={handleSelect}
          />
        ) : (
          <div className="font-semibold ml-[15px] text-xl text-dark">{translate(parentMenu?.name as string)}</div>
        )}
      </div>

      <div className="flex ml-auto">
        <UserMenu />
      </div>
    </div>
  );
};

export default Toolbar;
