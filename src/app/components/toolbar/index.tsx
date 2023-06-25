import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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
import { COLORS, PAGES, SelectItem } from '@types';

import { Icon, MenuIcon } from '../core/icons';
import SelectPopover from '../select-popover';
import UserMenu from '../user-menu';

const { NAVBAR_SIZE, EXPAND_NAVBAR_SIZE, TOOLBAR_HEIGHT } = SETTINGS_CONFIG;
const { DARK } = COLORS;

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
];

const Toolbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentLayoutSettings = useAppSelector(selectLayoutSetting);
  const { expandNavbar } = useAppSelector(selectDisplaySetting);

  const { pathname } = useLocation();
  const translateMenuItem = useI18n('MENU_ITEM');

  const parentMenu = MENUS.find(menu => menu.path && pathname.includes(menu.path));

  const toggleNavbar = () => dispatch(settingsActions.toggleNavbar());

  const { data: projectsData = [], refetch } = useGetProjectsQuery(undefined, { refetchOnMountOrArgChange: true });
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
    if (projectsData.length > 0) {
      setDisplayData(
        projectsData.map(item => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
    }
  }, [projectsData]);

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

  useEffect(() => {
    refetch();
  }, [pathname]);

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
          <SelectPopover data={displayData} selected={selected} onChangeValue={handleSelect} />
        ) : (
          <div className="font-semibold ml-[15px] text-xl text-dark">
            {translateMenuItem(parentMenu?.name as string)}
          </div>
        )}
      </div>

      <div className="flex ml-auto">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params: any) => <TextField {...params} label="Movie" variant="outlined" />}
        />
        <UserMenu />
      </div>
    </div>
  );
};

export default Toolbar;
