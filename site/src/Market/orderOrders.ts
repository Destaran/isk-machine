import { Order } from '../api/market/Order';

export function orderOrders(orders: Order[]) {
  const buy = orders
    .filter((order) => order.is_buy_order)
    .sort((a, b) => b.price - a.price);

  const sell = orders
    .filter((order) => !order.is_buy_order)
    .sort((a, b) => a.price - b.price);

  return { buy, sell };
}
