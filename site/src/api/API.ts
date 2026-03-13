import axios, { AxiosRequestConfig } from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ??
  `http://${window.location.hostname}:3000`;

const api = axios.create({ baseURL: apiBaseUrl });

export async function get<T, A = undefined>(path: string, params?: A) {
  const { data } = await api.get<T>(path, { params });
  return data;
}

export async function put<T>(path: string, inputData: unknown) {
  const { data } = await api.put<T>(path, inputData);
  return data;
}

export async function post<T>(
  path: string,
  inputData: unknown,
  config?: AxiosRequestConfig,
) {
  const { data } = await api.post<T>(path, inputData, config);
  return data;
}

export async function del<T>(path: string) {
  const { data } = await api.delete<T>(path);
  return data;
}
