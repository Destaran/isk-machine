import styled from 'styled-components';
import { Orders } from './Orders';
import { Table, TableHead, Cell, MarketTableColumnWidths } from './Table';
import { GetMarketsRegionIdOrdersResponse } from '../hey-api';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  color: white;
`;

interface Props {
  orders: GetMarketsRegionIdOrdersResponse;
  isBuy?: boolean;
}

export function List({ orders, isBuy }: Props) {
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
      <Title>{isBuy ? 'Buy Orders' : 'Sell Orders'}</Title>
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
        <Orders orders={orders} />
      </Table>
    </Container>
  );
}
