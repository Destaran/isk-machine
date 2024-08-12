import styled from "styled-components";
import { MarketOrder } from "../types";

interface Props {
  order: MarketOrder;
}

const Container = styled.div`
  border: 1px solid black;
`;

const StyledText = styled.p`
  margin: 0;
`;

export function Order({ order }: Props) {
  return (
    <Container key={order.order_id}>
      <StyledText>{order.price} ISK</StyledText>
      <StyledText>{order.volume_remain}</StyledText>
    </Container>
  );
}
