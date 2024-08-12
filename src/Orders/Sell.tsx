import styled from "styled-components";
import { MarketOrder } from "../types";
import { Order } from "./Order";

const Container = styled.div``;

interface Props {
  orders: MarketOrder[];
}

export function Sell({ orders }: Props) {
  return (
    <Container>
      <p>Sell orders</p>
      {orders.map((order) => {
        return <Order key={order.order_id} order={order} />;
      })}
    </Container>
  );
}
