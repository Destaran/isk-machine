import styled from "styled-components";
import { Orders } from "./Orders";

const Container = styled.div``;

const Wrapper = styled.div`
  border: 1px solid black;
  width: 1200px;
  height: 400px;
  overflow: scroll;
`;

interface Props {
  isBuy?: boolean;
  regionId: number;
  typeId: number | null;
}

export function List({ regionId, typeId, isBuy }: Props) {
  return (
    <Container>
      <h2>{isBuy ? "Buy Orders" : "Sell Orders"}</h2>
      <Wrapper>
        {typeId && <Orders regionId={regionId} typeId={typeId} isBuy={isBuy} />}
      </Wrapper>
    </Container>
  );
}
