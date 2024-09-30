import { type Order } from '../api/market/Order';
import { useExpiresIn } from '../hooks/utils/useExpiresIn';
import { Row, Cell, MarketTableColumnWidths } from './Table';
import { format } from 'date-fns';

interface Props {
  order: Order;
}

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

  const price = new Intl.NumberFormat('en-US').format(order.price);
  const issued = format(new Date(order.issued), 'yyyy-MM-dd HH:mm:ss');
  const expiresIn = useExpiresIn(order.issued, order.duration);

  return (
    <Row>
      <Cell width={regionW}>{order.region_id}</Cell>
      <Cell width={quantityW}>{order.volume_remain}</Cell>
      <Cell width={priceW}>{price} ISK</Cell>
      <Cell width={locationW}>{order.location_id}</Cell>
      <Cell width={jumpsW}>{'-'}</Cell>
      <Cell width={expiresW}>{expiresIn}</Cell>
      <Cell width={lastModifiedW}>{issued}</Cell>
    </Row>
  );
}
