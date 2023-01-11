import loadable from '@loadable/component';

import { Loading, Splash } from '@components';

type LazyProps = {
  path: string;
  fullScreen?: boolean;
  [name: string]: unknown;
};

const lazy = ({ path, fullScreen = false, ...props }: LazyProps): JSX.Element => {
  const Element = loadable(() => import(/* webpackChunkName: "[request]" */ `app/${path}`), {
    fallback: fullScreen ? <Splash /> : <Loading />,
  });

  return <Element {...props} />;
};

export default lazy;
