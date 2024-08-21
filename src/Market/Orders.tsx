import { useMarketDataWithNames } from "../hooks/markets/useMarketDataWithNames";
import { Order } from "./Order";

interface Props {
  isBuy?: boolean;
  regionId: number;
  typeId: number;
}

export function Orders({ regionId, typeId, isBuy }: Props) {
  const ordersQuery = useMarketDataWithNames({ regionId, typeId, isBuy });
  const { data: orders, isLoading } = ordersQuery;

  if (isLoading || !orders) {
    return null;
  }

  const sortedOrders = orders.sort((a, b) => {
    if (isBuy) {
      return b.price - a.price;
    } else {
      return a.price - b.price;
    }
  });

  return (
    <>
      {sortedOrders.map((order) => (
        <Order key={order.order_id} order={order} regionId={regionId} />
      ))}
    </>
  );
}
