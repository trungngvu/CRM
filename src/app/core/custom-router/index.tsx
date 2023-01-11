import { BrowserHistory } from 'history';
import { ReactNode, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

import { PAGES } from '@types';

type CustomRouterProps = {
  basename?: string;
  history: BrowserHistory;
  children: ReactNode;
};

const CustomRouter = ({ basename = PAGES.BASE_URL, history, children }: CustomRouterProps): JSX.Element => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router basename={basename} navigator={history} navigationType={state.action} location={state.location}>
      {children}
    </Router>
  );
};

export default CustomRouter;
