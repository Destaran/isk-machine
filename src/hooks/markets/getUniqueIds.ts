import { GetMarketsRegionIdOrdersResponse } from "../../hey-api";

export function getUniqueLocIds(orders: GetMarketsRegionIdOrdersResponse) {
  const uniqueNames = new Set<number>();

  orders.forEach((order) => {
    uniqueNames.add(order.location_id);
  });

  const names = Array.from(uniqueNames);
  return names.filter((name) => name.toString().length <= 8);
}
