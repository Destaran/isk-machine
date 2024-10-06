import styled from 'styled-components';
import { Order } from '../../api/market/MarketData';
import { useOrdersInfo } from '../../hooks/useOrdersInfo';
import { Type } from '../../redux/orders/ordersSlice';
import { useMarketGroups } from '../../hooks/useMarketGroups';

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  margin-left: 100px;
  justify-content: center;
  align-items: center;
`;

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

const GroupsText = styled.p`
  margin: 0;
  color: white;
  font-size: 11px;
`;

const Text = styled.p`
  margin: 0;
  color: white;
  font-size: 10px;
`;

interface Props {
  orders: {
    buy: Order[];
    sell: Order[];
  };
  type: Type;
}

export function ItemInfo({ orders, type }: Props) {
  const groups = useMarketGroups(type.id);
  const {
    margin,
    marginPercent,
    weightedAverageSell,
    weightedAverageBuy,
    sellOrderVolume,
    buyOrderVolume,
  } = useOrdersInfo(orders);

  const title = type ? type.name : 'Select an item';
  const isBp = groups?.includes('Blueprints') ? 'bp' : 'icon';
  const imgSrc = type
    ? `https://images.evetech.net/types/${type.id}/${isBp}?size=64`
    : '../placeholder.png';

  const profit = new Intl.NumberFormat('en-US').format(margin);
  const profitPercent = `${marginPercent}%`;
  const averageSellFormatted = new Intl.NumberFormat('en-US').format(weightedAverageSell);
  const averageBuyFormatted = new Intl.NumberFormat('en-US').format(weightedAverageBuy);
  const sellOrderVolumeFormatted = new Intl.NumberFormat('en-US').format(sellOrderVolume);
  const buyOrderVolumeFormatted = new Intl.NumberFormat('en-US').format(buyOrderVolume);

  return (
    <>
      <GroupsText>{groups}</GroupsText>
      <Title>{title}</Title>
      <Container>
        <div>
          <Image src={imgSrc} />
        </div>
        <Wrapper>
          <Text>
            Profit / item: {profit} ISK {`(${profitPercent})`}
          </Text>
          <Text>Sell price average: {averageSellFormatted} ISK</Text>
          <Text>Buy price average: {averageBuyFormatted} ISK</Text>
          <Text>Sell volume total: {sellOrderVolumeFormatted}</Text>
          <Text>Buy volume total: {buyOrderVolumeFormatted}</Text>
        </Wrapper>
      </Container>
    </>
  );
}
