import jwtDecode, { JwtPayload } from 'jwt-decode';

const isTokenValid = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }

  const decoded: JwtPayload = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  if (decoded.exp && decoded.exp < currentTime) {
    return false;
  }

  return true;
};

export default isTokenValid;
