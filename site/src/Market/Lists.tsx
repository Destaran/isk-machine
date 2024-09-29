import styled from 'styled-components';
import { List } from './List';
import { useSelector } from 'react-redux';
import { type as selectType } from '../redux/orders/ordersSlice';
import { useOrders } from '../api/market/useOrders';
import { orderOrders } from './orderOrders';

const Container = styled.div`
  width: 80%;
  background-color: #2b2b2b;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  border: 1px solid white;
`;

const Title = styled.h1`
  color: white;
`;

export function Lists() {
  const type = useSelector(selectType);
  const { data: orders, isFetched } = useOrders(type?.type_id || 0, !!type);

  if (!isFetched || !orders) {
    return (
      <Container>
        <Title>Select an item</Title>
        <Image src="./unselected.png" />
        <List orders={[]} />
        <List orders={[]} isBuy />
      </Container>
    );
  }

  const { sell, buy } = orderOrders(orders);

  return (
    <Container>
      <Title>{type ? type.name : 'Select an item'}</Title>
      {type && (
        <Image
          src={`https://images.evetech.net/types/${type.type_id}/icon?size=64`}
        />
      )}
      <List orders={sell} />
      <List orders={buy} isBuy />
    </Container>
  );
}
