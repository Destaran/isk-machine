import styled from "styled-components";
import { Orders } from "./Orders";
import { Table, TableHead, Cell, MarketTableColumnWidths } from "./Table";

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  color: white;
`;

interface Props {
  isBuy?: boolean;
  regionId: number;
  typeId: number | undefined;
}

export function List({ regionId, typeId, isBuy }: Props) {
  const {
    regionW,
    quantityW,
    priceW,
    locationW,
    jumpsW,
    expiresW,
    lastModifiedW,
  } = MarketTableColumnWidths;
  return (
    <Container>
      <Title>{isBuy ? "Buy Orders" : "Sell Orders"}</Title>
      <Table>
        <TableHead>
          <Cell width={regionW}>Region</Cell>
          <Cell width={quantityW}>Quantity</Cell>
          <Cell width={priceW}>Price</Cell>
          <Cell width={locationW}>Location</Cell>
          <Cell width={jumpsW}>Jumps</Cell>
          <Cell width={expiresW}>Expires In</Cell>
          <Cell width={lastModifiedW}>Last Modified</Cell>
        </TableHead>
        {typeId && <Orders regionId={regionId} typeId={typeId} isBuy={isBuy} />}
      </Table>
    </Container>
  );
}
