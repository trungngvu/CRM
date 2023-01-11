import { useRoutes } from 'react-router-dom';

import { ROUTES_CONFIG } from '@configs';

const Routes = (): JSX.Element => {
  const routes = useRoutes(ROUTES_CONFIG);

  return <>{routes}</>;
};

export default Routes;
