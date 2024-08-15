import styled from "styled-components";
import { GetMarketsRegionIdOrdersResponse } from "../hey-api";

const Container = styled.div`
  display: flex;
  border: 1px solid black;
`;

const Column = styled.div`
  width: 400px;
`;

interface Props {
  order: GetMarketsRegionIdOrdersResponse[number];
}

export function Order({ order }: Props) {
  return (
    <Container>
      <Column>{new Intl.NumberFormat("en-US").format(order.price)} ISK</Column>
      <Column>{order.volume_remain}</Column>
      <Column>{order.location_id}</Column>
    </Container>
  );
}
