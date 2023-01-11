import { selectUserRoles, useAppSelector } from '@store';
import { ROLE } from '@types';

const useRoles = () => {
  const userRoles = useAppSelector(selectUserRoles);

  return {
    isAdmin: userRoles?.includes(ROLE.ADMIN),
    isUser: userRoles?.includes(ROLE.USER),
  };
};

export default useRoles;
