import { PAGES_NAME, ROLE } from '../types';

type CheckPermissionProps = {
  auth: ROLE[];
  roles: ROLE[];
  permissions: PAGES_NAME[];
  name: PAGES_NAME;
};

const checkPermission = ({ auth, roles, permissions, name }: CheckPermissionProps): boolean => {
  /**
   * If don't have any auth value for this router / menu
   */
  if (auth.length === 0) {
    return true;
  }

  /**
   * If router / menu auth exist and includes GUEST role
   */
  if (auth.includes(ROLE.GUEST)) {
    /**
     * If user roles is empty ( user does not login )
     */
    if (roles.length === 0) {
      return true;
    }

    /**
     * If user already login ( have user roles )
     */
    return false;
  }

  /**
   * If router / menu auth exist and does not includes GUEST role
   */

  /**
   * If don't have any user roles ( user does not login )
   */
  if (!roles || roles.length === 0) {
    return false;
  }

  /**
   * If roles includes ADMIN role
   */
  if (roles.includes(ROLE.ADMIN)) {
    return true;
  }

  /**
   * If don't have page name or page name is Home page
   */
  if (!name || name === PAGES_NAME.HOME) {
    return true;
  }

  return permissions.includes(name);
};

export default checkPermission;
