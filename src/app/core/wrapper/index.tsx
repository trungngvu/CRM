import 'styles/global.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';
import Provider from 'react-redux/es/components/Provider';
import { toast, ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { Splash } from '@components';
import { SETTINGS_CONFIG } from '@configs';
import history from '@history';
import useFonts from '@hooks/use-fonts';
import store, { persistor } from '@store';

import Auth from '../auth';
import Router from '../custom-router';
import Permission from '../permission';

type WrapperProviderProps = {
  children: ReactNode;
};

const { LOADING_FONTS } = SETTINGS_CONFIG;

const Wrapper = ({ children }: WrapperProviderProps): JSX.Element => {
  const isFontsReady = useFonts({ fonts: LOADING_FONTS });

  if (!isFontsReady) {
    return <Splash />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Splash />} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Auth>
            <Router history={history}>
              <Permission>{children}</Permission>

              <ToastContainer
                autoClose={4000}
                pauseOnHover={false}
                position={toast.POSITION.BOTTOM_RIGHT}
                theme="colored"
              />
            </Router>
          </Auth>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
