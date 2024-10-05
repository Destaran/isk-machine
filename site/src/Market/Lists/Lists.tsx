import styled from 'styled-components';
import { List } from './List';
import { useAppSelector } from '../../redux/hooks';
import { selectOrders } from '../../redux/orders/selectOrders';
import { type as selectType } from '../../redux/orders/ordersSlice';

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
  const type = useAppSelector(selectType);
  const { buy, sell } = useAppSelector(selectOrders);
  const title = type ? type.name : 'Select an item';
  const imgSrc = type
    ? `https://images.evetech.net/types/${type.id}/icon?size=64`
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
