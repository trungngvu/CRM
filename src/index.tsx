import ReactDOM from 'react-dom/client';

import App from '@app';
import { Wrapper } from '@core';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Wrapper>
    <App />
  </Wrapper>
);
