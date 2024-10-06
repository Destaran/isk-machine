import { Order } from '../api/market/MarketData';

export function useOrdersInfo(orders: { buy: Order[]; sell: Order[] }) {
  const { buy, sell } = orders;

  if (buy.length === 0 || sell.length === 0) {
    return {
      margin: 0,
      marginPercent: 0,
      averageSell: 0,
      averageBuy: 0,
      sellOrderVolume: 0,
      buyOrderVolume: 0,
    };
  }

  const margin = sell[0].price - buy[0].price;
  const marginPercent = ((margin / sell[0].price) * 100).toFixed(2);
  const averageSell = sell.reduce((acc, order) => acc + order.price, 0) / sell.length;
  const averageBuy = buy.reduce((acc, order) => acc + order.price, 0) / buy.length;
  const sellOrderVolume = sell.reduce((acc, order) => acc + order.volume_remain, 0);
  const buyOrderVolume = buy.reduce((acc, order) => acc + order.volume_remain, 0);

  return {
    margin,
    marginPercent,
    averageSell,
    averageBuy,
    sellOrderVolume,
    buyOrderVolume,
  };
}
