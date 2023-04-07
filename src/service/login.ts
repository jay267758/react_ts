import { request } from "../requests";

export const login = (data?: any) => {
  return request.post('/api/login', data);
}

export const get = () => {
  return request.get('/api/v1/login');
}

export const log = () => {
  return request.get('/log');
}