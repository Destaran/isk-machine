import { Order } from '../api/market/MarketData';
import { Entry } from './Entry';

interface Props {
  orders: Order[];
}

export function Entries({ orders }: Props) {
  return (
    <>
      {orders.map((order) => (
        <Entry key={order.order_id} order={order} />
      ))}
    </>
  );
}
