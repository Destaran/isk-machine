import axios from "axios";

const api = axios.create({ baseURL: "https://esi.evetech.net/latest/" });

export async function get<T>(path: string) {
  const { data } = await api.get<T>(path);
  return data;
}
