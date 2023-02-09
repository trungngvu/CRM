import loadable from '@loadable/component';

import Loading from '../components/core/loading';
import Splash from '../components/core/splash';

type LazyProps = {
  path: string;
  fullScreen?: boolean;
  [name: string]: unknown;
};

/**
 * Lazy import component
 */
const lazy = ({ path, fullScreen = false, ...props }: LazyProps): JSX.Element => {
  const Element = loadable(() => import(/* webpackChunkName: "[request]" */ `app/${path}`), {
    fallback: fullScreen ? <Splash /> : <Loading />,
  });

  return <Element {...props} />;
};

export default lazy;
