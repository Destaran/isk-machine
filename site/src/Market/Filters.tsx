import styled from 'styled-components';
import { filterMarketHubs } from '../redux/orders/ordersSlice';
import { Filter } from './Filter';

const Container = styled.div``;

export function Filters() {
  return (
    <Container>
      <Filter name="Market Hubs only" action={filterMarketHubs} />
    </Container>
  );
}
