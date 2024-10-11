import styled from 'styled-components';
import { Entries } from './Entries';
import { Table, TableHead, Cell, MarketTableColumnWidths } from './Table';
import { Order } from '../../api/market/MarketData';

const Container = styled.div`
  width: 100%;
  margin: 0 0 10px 0;
`;

const Title = styled.h2`
  color: white;
  margin: 0 0 10px 0;
  font-family: Orbitron;
`;

interface Props {
  orders: Order[];
  isBuy?: boolean;
}

export function List({ orders, isBuy }: Props) {
  const { regionW, quantityW, priceW, locationW, jumpsW, expiresW, lastModifiedW } =
    MarketTableColumnWidths;

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
        <Entries orders={orders} />
      </Table>
    </Container>
  );
}
