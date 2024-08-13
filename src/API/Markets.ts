import {
  GetMarketsGroupsMarketGroupIdResponse,
  GetMarketsGroupsResponse,
  GetMarketsRegionIdOrdersResponse,
} from "../hey-api";
import { get } from "./Axios";

export type OrderType = "buy" | "sell" | "all";

export async function getMarketData(
  regionId: number,
  typeId: number | null,
  page: string,
  orderType: OrderType
) {
  if (!regionId) {
    throw new Error("Region id is required");
  }
  return await get<GetMarketsRegionIdOrdersResponse>(
    `/markets/${regionId}/orders/?datasource=tranquility&order_type=${orderType}&page=${page}${
      typeId ? `&type_id=${typeId}` : ""
    }`
  );
}

export async function getMarketGroup(id: number) {
  return await get<GetMarketsGroupsMarketGroupIdResponse>(
    `/markets/groups/${id}`
  );
}

export async function getMarketGroups() {
  return await get<GetMarketsGroupsResponse>("/markets/groups");
}
