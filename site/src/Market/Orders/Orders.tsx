import styled from 'styled-components';
import { OrdersList } from './OrdersList';
import { useAppSelector } from '../../redux/hooks';
import { selectOrders } from '../../redux/orders/selectOrders';
import { ItemInfo } from './ItemInfo';
import { scrapeDate, type as selectType } from '../../redux/orders/ordersSlice';
import { LastUpdated } from './LastUpdated';
import { sortedSellOrders } from '../../redux/orders/sortedSellOrders';
import { sortedBuyOrders } from '../../redux/orders/sortedBuyOrders';

const Container = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.emGrey};
  border-radius: 5px;
`;

export function Orders() {
  const type = useAppSelector(selectType);
  const orders = useAppSelector(selectOrders);
  const sellOrders = useAppSelector(sortedSellOrders);
  const buyOrders = useAppSelector(sortedBuyOrders);
  const scrapeTimestamp = useAppSelector(scrapeDate);

  return (
    <Container>
      <ItemInfo orders={orders} type={type} />
      <OrdersList orders={sellOrders ?? []} />
      <OrdersList orders={buyOrders ?? []} isBuy />
      {!!scrapeTimestamp && <LastUpdated timestamp={scrapeTimestamp} />}
    </Container>
  );
}
