import { clsx } from 'clsx';
import isEqual from 'lodash/isEqual';
import { matchRoutes, useLocation } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { Navbar, Toolbar } from '@components';
import { ROUTES_CONFIG, SETTINGS_CONFIG } from '@configs';
import { Routes } from '@core';
import {
  selectDisplaySetting,
  selectLayoutSetting,
  settingsActions,
  settingsInitialState,
  useAppDispatch,
  useAppSelector,
} from '@store';

const initialSettingLayout = settingsInitialState.layout;

const { NAVBAR_SIZE, EXPAND_NAVBAR_SIZE, TOOLBAR_HEIGHT } = SETTINGS_CONFIG;

const Layout = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentLayoutSettings = useAppSelector(selectLayoutSetting);
  const { expandNavbar } = useAppSelector(selectDisplaySetting);

  const location = useLocation();

  const [matchedRoute] = matchRoutes(ROUTES_CONFIG, location) ?? [];

  /**
   * Set layout settings by route
   */
  useDeepCompareEffect(() => {
    const routeSettingLayout = { ...initialSettingLayout, ...matchedRoute?.route?.settings?.layout };

    if (!isEqual(routeSettingLayout, currentLayoutSettings)) {
      dispatch(settingsActions.setLayout(routeSettingLayout));
    }
  }, [dispatch, initialSettingLayout, matchedRoute, currentLayoutSettings]);

  return (
    <div className="flex w-full">
      <div className="flex flex-auto min-w-0">
        {currentLayoutSettings.navbar && <Navbar />}

        <main
          style={{
            marginLeft: expandNavbar ? EXPAND_NAVBAR_SIZE : NAVBAR_SIZE,
          }}
          className={clsx(
            {
              '!ml-0': !currentLayoutSettings.navbar,
            },
            'flex flex-col flex-1 min-h-full z-10 min-w-0'
          )}
        >
          {currentLayoutSettings.toolbar && <Toolbar />}

          <div
            style={{
              marginTop: currentLayoutSettings.toolbar ? TOOLBAR_HEIGHT : 0,
            }}
            className="flex-1"
          >
            <Routes />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
