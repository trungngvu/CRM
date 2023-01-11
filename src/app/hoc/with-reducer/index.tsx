import { Reducer } from '@reduxjs/toolkit';
import { ElementType } from 'react';

import { injectReducer } from '@store';

const withReducer =
  <T,>(key: string, reducer: Reducer) =>
  (Component: ElementType) => {
    injectReducer(key, reducer);

    return (props: T) => <Component {...props} />;
  };

export default withReducer;
