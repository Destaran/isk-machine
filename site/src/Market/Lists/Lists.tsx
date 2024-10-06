import styled from 'styled-components';
import { List } from './List';
import { useAppSelector } from '../../redux/hooks';
import { selectOrders } from '../../redux/orders/selectOrders';
import { ItemInfo } from './ItemInfo';

const Container = styled.div`
  width: 80%;
  padding: 10px;
  background-color: #4b4b4b;
`;

export function Lists() {
  const orders = useAppSelector(selectOrders);
  const { buy, sell } = orders;

  return (
    <Container>
      <ItemInfo orders={orders} />
      <List orders={sell} />
      <List orders={buy} isBuy />
    </Container>
  );
}
