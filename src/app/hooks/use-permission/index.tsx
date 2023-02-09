import { selectUserPermissions, selectUserRoles, useAppSelector } from '../../store';
import { PAGES_NAME, ROLE } from '../../types';

const usePermission = (name: PAGES_NAME) => {
  const userRoles = useAppSelector(selectUserRoles);
  const userPermissions = useAppSelector(selectUserPermissions);

  return userRoles?.includes(ROLE.ADMIN) ? true : userPermissions.includes(name);
};

export default usePermission;
