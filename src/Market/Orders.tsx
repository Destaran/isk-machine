import styled from "styled-components";
import { useMarketData } from "../hooks/markets/useMarketData";
import { Order } from "./Order";

const Container = styled.div``;

interface Props {
  isBuy?: boolean;
  regionId: number;
  typeId: number;
}

export function Orders({ regionId, typeId, isBuy }: Props) {
  const ordersQuery = useMarketData({ regionId, typeId, isBuy });
  const { data: response, isLoading } = ordersQuery;

  if (isLoading || !response || !response.data) {
    return null;
  }

  const orders = response.data;

  const sortedOrders = orders.sort((a, b) => {
    if (isBuy) {
      return b.price - a.price;
    } else {
      return a.price - b.price;
    }
  });

  return (
    <Container>
      {sortedOrders.map((order) => (
        <Order key={order.order_id} order={order} />
      ))}
    </Container>
  );
}
