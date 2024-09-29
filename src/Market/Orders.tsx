import { GetMarketsRegionIdOrdersResponse } from '../hey-api';
import { Order } from './Order';

interface Props {
  orders: GetMarketsRegionIdOrdersResponse;
}

export function Orders({ orders }: Props) {
  return (
    <>
      {orders.map((order) => (
        <Order key={order.order_id} order={order} />
      ))}
    </>
  );
}
