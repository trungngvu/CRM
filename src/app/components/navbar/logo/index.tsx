import { Link } from 'react-router-dom';

import { SETTINGS_CONFIG } from '@configs';
import { selectDisplaySetting, useAppSelector } from '@store';
import { PAGES } from '@types';

const { LOGO_SIZE, TOOLBAR_HEIGHT } = SETTINGS_CONFIG;

const Logo = (): JSX.Element => {
  const { expandNavbar } = useAppSelector(selectDisplaySetting);

  return (
    <div
      style={{
        height: TOOLBAR_HEIGHT,
        minHeight: TOOLBAR_HEIGHT,
        maxHeight: TOOLBAR_HEIGHT,
      }}
      className="flex items-center justify-center w-full py-[10px] bg-white"
    >
      <Link to={PAGES.HOME} className="w-full h-full border-r border-r-secondary flex items-center px-[10px]">
        <div className="grid h-full place-items-center">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            style={{
              width: LOGO_SIZE,
              minWidth: LOGO_SIZE,
              maxWidth: LOGO_SIZE,
              height: LOGO_SIZE,
              minHeight: LOGO_SIZE,
              maxHeight: LOGO_SIZE,
            }}
          />
        </div>
        {expandNavbar && (
          <div className="grid ml-2 place-items-center">
            <img
              src="/assets/icons/logo-text.svg"
              alt="logo-text"
              style={{
                height: 30,
                minHeight: 30,
                maxHeight: 30,
              }}
            />
          </div>
        )}
      </Link>
    </div>
  );
};

export default Logo;
