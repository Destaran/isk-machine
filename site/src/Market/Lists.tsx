import styled from 'styled-components';
import { List } from './List';
import { useSelector } from 'react-redux';
import { selectOrders, type as selectType } from '../redux/orders/ordersSlice';

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
  const { buy, sell } = useSelector(selectOrders);
  const title = type ? type.name : 'Select an item';
  const imgSrc = type
    ? `https://images.evetech.net/types/${type.type_id}/icon?size=64`
    : './placeholder.png';

  return (
    <Container>
      <Title>{title}</Title>
      <Image src={imgSrc} />
      <List orders={sell} />
      <List orders={buy} isBuy />
    </Container>
  );
}
