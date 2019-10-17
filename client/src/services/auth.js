import jwtDecode from 'jwt-decode';
import httpRequest from './http';

const tokenKey = 'token';

export const setToken = token => {
  localStorage.setItem(tokenKey, token);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.clear();
};

export const authenticate = payload => {
  const apiUrl = `/api/auth/login`;

  return httpRequest.post(apiUrl, payload);
};

export const register = payload => {
  const apiUrl = `/api/user/register`;

  return httpRequest.post(apiUrl, payload);
};
