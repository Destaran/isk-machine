import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export async function get<T>(path: string) {
  const { data } = await api.get<T>(path);
  return data;
}

export async function put<T>(path: string, inputData: unknown) {
  const { data } = await api.put<T>(path, inputData);
  return data;
}

export async function post<T>(
  path: string,
  inputData: unknown,
  config?: AxiosRequestConfig
) {
  const { data } = await api.post<T>(path, inputData, config);
  return data;
}

export async function del<T>(path: string) {
  const { data } = await api.delete<T>(path);
  return data;
}
