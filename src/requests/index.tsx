import { message } from 'antd';
import axios from 'axios';

const request = axios.create({
  // baseURL: '/_opsys',
});

request.interceptors.request.use(config => {
  return config;
});

request.interceptors.response.use(
  (res: any) => {
    if (res.status !== 200) {
      message.error('请求错误');
      throw new Error('network error');
    } else if (res.data.code !== 200) {
      message.error(res.data.status.message);
      throw new Error('network error');
    }
    return res.data;
  },
  () => {
    message.error('请求错误');
  },
);

export {
  axios,
  request
}