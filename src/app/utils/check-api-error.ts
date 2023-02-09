import { AxiosError } from 'axios';

const checkApiError = (error: AxiosError) => {
  /**
   * If don't have error status or error status is 500
   */
  const isNetworkError = error && (!error.status || error.status === '500');

  return {
    isNetworkError,
  };
};

export default checkApiError;
