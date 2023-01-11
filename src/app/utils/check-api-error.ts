import { AxiosError } from 'axios';

const checkApiError = (error: AxiosError) => {
  const isNetworkError = error && (!error.status || error.status === '500');

  return {
    isNetworkError,
  };
};

export default checkApiError;
