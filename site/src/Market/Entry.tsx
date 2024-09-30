import { useSelector } from 'react-redux';
import { type Order } from '../api/market/MarketData';
import { useExpiresIn } from '../hooks/utils/useExpiresIn';
import { Row, Cell, MarketTableColumnWidths } from './Table';
import { format } from 'date-fns';
import { regions, stations, systems } from '../redux/orders/ordersSlice';
import styled from 'styled-components';
import { colors } from '../utils/SecurityColors';

interface Props {
  order: Order;
}

interface SecStatProps {
  color: string;
}

const SecStat = styled.span<SecStatProps>`
  margin: 0;
  margin-right: 10px;
  color: ${(props) => props.color};
  font-weight: bold;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;
`;

export function Entry({ order }: Props) {
  const {
    regionW,
    quantityW,
    priceW,
    locationW,
    jumpsW,
    expiresW,
    lastModifiedW,
  } = MarketTableColumnWidths;

  const stationData = useSelector(stations);
  let locationName = 'Unknown';
  if (order.location_id.toString().length === 8) {
    locationName = stationData[order.location_id];
  }
  const price = new Intl.NumberFormat('en-US').format(order.price);
  const issued = format(new Date(order.issued), 'yyyy-MM-dd HH:mm:ss');
  const expiresIn = useExpiresIn(order.issued, order.duration);
  const regionName = useSelector(regions)[order.region_id];
  const secStatus = useSelector(systems)[order.system_id].security_status;
  const showSecStatus = secStatus < 0 ? '0.0' : secStatus.toFixed(1);
  const color = colors[showSecStatus];

  return (
    <Row>
      <Cell width={regionW}>{regionName}</Cell>
      <Cell width={quantityW}>{order.volume_remain}</Cell>
      <Cell width={priceW}>{price} ISK</Cell>
      <Cell width={locationW}>
        <SecStat color={color}>{showSecStatus}</SecStat>
        <Text>{locationName}</Text>
      </Cell>
      <Cell width={jumpsW}>{'-'}</Cell>
      <Cell width={expiresW}>{expiresIn}</Cell>
      <Cell width={lastModifiedW}>{issued}</Cell>
    </Row>
  );
}
