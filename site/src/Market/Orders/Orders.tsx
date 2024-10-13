import styled from 'styled-components';
import { OrdersList } from './OrdersList';
import { useAppSelector } from '../../redux/hooks';
import { selectOrders } from '../../redux/orders/selectOrders';
import { ItemInfo } from './ItemInfo';
import { scrapeDate, type as selectType } from '../../redux/orders/ordersSlice';
import { LastUpdated } from './LastUpdated';

const Container = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.emGrey};
  border-radius: 5px;
`;

export function Orders() {
  const type = useAppSelector(selectType);
  const orders = useAppSelector(selectOrders);
  const scrapeTimestamp = useAppSelector(scrapeDate);

  const { buy, sell } = orders;

  return (
    <Container>
      <ItemInfo orders={orders} type={type} />
      <OrdersList orders={sell} />
      <OrdersList orders={buy} isBuy />
      {!!scrapeTimestamp && <LastUpdated timestamp={scrapeTimestamp} />}
    </Container>
  );
}
