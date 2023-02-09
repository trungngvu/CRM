import { ReactNode, useEffect } from 'react';

import { Splash } from '@components';
import {
  selectUser,
  settingsActions,
  useAppDispatch,
  useAppSelector,
  userActions,
  useSignInWithTokenMutation,
} from '@store';
import checkToken from '@utils/check-token';

type AuthProps = {
  children: ReactNode;
};

const Auth = ({ children }: AuthProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { waitAuthCheck, accessToken } = useAppSelector(selectUser);
  const [signInWithToken] = useSignInWithTokenMutation();

  useEffect(() => {
    /**
     * Action fired if access token does not exist
     */
    if (!accessToken) {
      dispatch(userActions.noAccessToken());
    }

    /**
     * Action fired if access token exist but invalid token
     */
    if (accessToken && !checkToken(accessToken)) {
      dispatch(userActions.signOut());
      dispatch(settingsActions.resetSettings());
    }

    /**
     * Action fired if access token exist and valid
     */
    if (accessToken && checkToken(accessToken)) {
      signInWithToken();
    }
  }, [dispatch]);

  if (waitAuthCheck) {
    return <Splash />;
  }

  return <>{children}</>;
};

export default Auth;
