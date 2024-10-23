import styled from 'styled-components';
import { Entries } from './Entries';
import { Table } from './Table';
import { Order } from '../../api/market/MarketData';
import { TableHead } from './TableHead';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin: 10px 0;
  font-family: Orbitron;
`;

interface Props {
  orders: Order[];
  isBuy?: boolean;
}

export function OrdersList({ orders, isBuy }: Props) {
  return (
    <Container>
      <Title>{isBuy ? 'Buy Orders' : 'Sell Orders'}</Title>
      <Table>
        <TableHead isBuy={isBuy} />
        <Entries orders={orders} />
      </Table>
    </Container>
  );
}
