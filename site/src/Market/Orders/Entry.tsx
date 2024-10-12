import { useSelector } from 'react-redux';
import { Row, Cell, MarketTableColumnWidths } from './Table';
import { format } from 'date-fns';
import styled from 'styled-components';
import { Order } from '../../api/market/MarketData';
import { regions, stations, systems } from '../../redux/orders/ordersSlice';
import { useAppSelector } from '../../redux/hooks';
import { useExpiresIn } from '../../hooks/useExpiresIn';

interface Props {
  order: Order;
}

interface SecStatProps {
  $secstatus: string;
}

const SecStat = styled.span<SecStatProps>`
  margin: 0;
  margin-right: 10px;
  color: ${({ theme, $secstatus }) => theme.securityColors[$secstatus]};
  font-weight: bold;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;
`;

export function Entry({ order }: Props) {
  const { regionW, quantityW, priceW, locationW, jumpsW, expiresW, lastModifiedW } =
    MarketTableColumnWidths;

  const stationData = useSelector(stations);
  let locationName = 'Unknown';
  if (order.location_id.toString().length === 8) {
    locationName = stationData[order.location_id];
  }
  const price = new Intl.NumberFormat('en-US').format(order.price);
  const issued = format(new Date(order.issued), 'yyyy-MM-dd HH:mm:ss');
  const expiresIn = useExpiresIn(order.issued, order.duration);
  const regionName = useAppSelector(regions)[order.region_id];
  const secStatus = useAppSelector(systems)[order.system_id].security_status;

  return (
    <Row>
      <Cell width={regionW}>{regionName}</Cell>
      <Cell width={quantityW}>{order.volume_remain}</Cell>
      <Cell width={priceW}>{price} ISK</Cell>
      <Cell width={locationW}>
        <SecStat $secstatus={secStatus}>{secStatus}</SecStat>
        <Text>{locationName}</Text>
      </Cell>
      <Cell width={jumpsW}>{'-'}</Cell>
      <Cell width={expiresW}>{expiresIn}</Cell>
      <Cell width={lastModifiedW}>{issued}</Cell>
    </Row>
  );
}
