import styled from 'styled-components';
import { List } from './List';
import { useSelector } from 'react-redux';
import { selectOrders, type as selectType } from '../redux/orders/ordersSlice';

const Container = styled.div`
  width: 80%;
  background-color: #2b2b2b;
`;

const Title = styled.h1`
  color: white;
`;

export function Lists() {
  const type = useSelector(selectType);
  const orders = useSelector(selectOrders);
  const { sell, buy } = orders;

  return (
    <Container>
      <Title>{type ? type.name : 'Select an item'}</Title>
      {type && (
        <img
          src={`https://images.evetech.net/types/${type.type_id}/icon?size=64`}
        />
      )}
      <List orders={sell} />
      <List orders={buy} isBuy />
    </Container>
  );
}
