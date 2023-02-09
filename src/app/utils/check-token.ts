import jwtDecode, { JwtPayload } from 'jwt-decode';

const checkToken = (accessToken: string): boolean => {
  /**
   * Check if access token is does not exist
   */
  if (!accessToken) {
    return false;
  }

  /**
   * Check if access token is not valid time
   */
  const decoded: JwtPayload = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  if (decoded.exp && decoded.exp < currentTime) {
    return false;
  }

  return true;
};

export default checkToken;
