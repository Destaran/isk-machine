import { Order } from '../api/market/MarketData';

export function useOrdersInfo(orders: { buy: Order[]; sell: Order[] }) {
  const { buy, sell } = orders;

  if (buy.length === 0 || sell.length === 0) {
    return {
      margin: 0,
      marginPercent: 0,
    };
  }

  const margin = sell[0].price - buy[0].price;
  const marginPercent = ((margin / sell[0].price) * 100).toFixed(2);

  return {
    margin,
    marginPercent,
  };
}
