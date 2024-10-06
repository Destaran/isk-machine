import styled from 'styled-components';
import { List } from './List';
import { useAppSelector } from '../../redux/hooks';
import { selectOrders } from '../../redux/orders/selectOrders';
import { ItemInfo } from './ItemInfo';
import { type as selectType } from '../../redux/orders/ordersSlice';

const Container = styled.div`
  width: 80%;
  padding: 10px;
  background-color: #4b4b4b;
`;

export function Lists() {
  const type = useAppSelector(selectType);
  const orders = useAppSelector(selectOrders);

  const { buy, sell } = orders;
  const hasOrders = buy.length > 0 || sell.length > 0;

  return (
    <Container>
      {hasOrders && type && <ItemInfo orders={orders} type={type} />}
      <List orders={sell} />
      <List orders={buy} isBuy />
    </Container>
  );
}
