import styled from "styled-components";
import { MarketOrder } from "../types";
import { Order } from "./Order";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

interface Props {
  orders: MarketOrder[];
}

export function Buy({ orders }: Props) {
  return (
    <Container>
      <p>Buy orders</p>
      {orders.map((order) => {
        return <Order key={order.order_id} order={order} />;
      })}
    </Container>
  );
}
