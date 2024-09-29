import { type Order } from '../api/market/Order';
import { Row, Cell, MarketTableColumnWidths } from './Table';

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

  const issued = new Date(order.issued).getUTCDate();

  return (
    <Row>
      <Cell width={regionW}>{order.region_id}</Cell>
      <Cell width={quantityW}>{order.volume_remain}</Cell>
      <Cell width={priceW}>
        {new Intl.NumberFormat('en-US').format(order.price)} ISK
      </Cell>
      <Cell width={locationW}>{order.location_id}</Cell>
      <Cell width={jumpsW}>{'-'}</Cell>
      <Cell width={expiresW}>{issued}</Cell>
      <Cell width={lastModifiedW}>{issued}</Cell>
    </Row>
  );
}
