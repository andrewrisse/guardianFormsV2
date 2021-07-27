import axios, { AxiosRequestConfig } from 'axios';

export const makeBackendRequest = async (method: 'GET' | 'POST' | 'PATCH' |  'DELETE', endpoint: string, token: string, data?: any) => {
  const config: AxiosRequestConfig = {
    method: method,
    url: `${process.env.REACT_APP_BACKEND_URL}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const res = await axios(config);
  return res.data;
}
