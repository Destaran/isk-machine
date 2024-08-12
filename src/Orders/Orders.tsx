import styled from "styled-components";
import { Buy } from "./Buy";
import { Sell } from "./Sell";
import { useMarketData } from "../hooks/useMarketData";
import { ItemType } from "../types";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
`;

const jitaId = 10000002;
const jitaHubId = 60003760;

interface Props {
  item: ItemType;
}

export function Orders({ item }: Props) {
  const ordersQuery = useMarketData(jitaId, item.type_id);

  const { data: orders, isLoading, isError } = ordersQuery;

  if (isLoading) {
    return <Container>loading orders...</Container>;
  }

  if (isError || !orders) {
    return <Container>couldn't load orders</Container>;
  }

  const jitaOrders = orders.filter((order) => order.location_id === jitaHubId);

  const buyOrders = jitaOrders
    .filter((order) => order.is_buy_order)
    .sort((a, b) => b.price - a.price);
  const sellOrders = jitaOrders
    .filter((order) => !order.is_buy_order)
    .sort((a, b) => a.price - b.price);

  return (
    <Container>
      <h3>{item.name}</h3>
      <Wrapper>
        <Buy orders={buyOrders} />
        <Sell orders={sellOrders} />
      </Wrapper>
    </Container>
  );
}
