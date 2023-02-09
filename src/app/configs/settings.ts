import { PAGES } from '../types';

export const SETTINGS_CONFIG = {
  /**
   * Redirect url
   */
  SIGN_IN_REDIRECT_URL: PAGES.HOME,
  SIGN_OUT_REDIRECT_URL: PAGES.HOME,
  PERMISSION_REDIRECT_URL: PAGES.SIGN_IN,

  /**
   * Fonts
   */
  LOADING_FONTS: ['16px Arial'],

  /**
   * Logo
   */
  LOGO_SIZE: '40px',

  /**
   * Navbar
   */
  NAVBAR_SIZE: '60px',
  EXPAND_NAVBAR_SIZE: '260px',

  /**
   * Toolbar
   */
  TOOLBAR_HEIGHT: '60px',

  /**
   * Table
   */
  TABLE_ROW_VALUES: [10, 20, 50, 100],
};
