import styled from 'styled-components';
import { Order } from '../../api/market/MarketData';
import { useAppSelector } from '../../redux/hooks';
import { type as selectType } from '../../redux/orders/ordersSlice';
import { useOrdersInfo } from '../../hooks/useOrdersInfo';

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div``;

const Image = styled.img`
  width: 64px;
  height: 64px;
  border: 1px solid #2b2b2b;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  margin-bottom: 10px;
  font-family: Orbitron;
`;

const Text = styled.p`
  margin: 0;
  color: white;
`;

interface Props {
  orders: {
    buy: Order[];
    sell: Order[];
  };
}

export function ItemInfo({ orders }: Props) {
  const { margin, marginPercent } = useOrdersInfo(orders);
  const type = useAppSelector(selectType);

  const title = type ? type.name : 'Select an item';
  const imgSrc = type
    ? `https://images.evetech.net/types/${type.id}/icon?size=64`
    : '../placeholder.png';

  const profit = new Intl.NumberFormat('en-US').format(margin);
  const profitPercent = `${marginPercent}%`;

  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <Image src={imgSrc} />
        <Text>
          Profit / item: {profit} ISK {`(${profitPercent})`}
        </Text>
      </Wrapper>
      <Wrapper></Wrapper>
    </Container>
  );
}
