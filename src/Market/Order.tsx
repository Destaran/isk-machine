import { GetMarketsRegionIdOrdersResponse } from "../hey-api";
import { Row, Cell, MarketTableColumnWidths } from "./Table";

interface Props {
  order: GetMarketsRegionIdOrdersResponse[number] & { location: string };
  regionId: number;
}

export function Order({ order, regionId }: Props) {
  const {
    regionW,
    quantityW,
    priceW,
    locationW,
    jumpsW,
    expiresW,
    lastModifiedW,
  } = MarketTableColumnWidths;

  return (
    <Row>
      <Cell width={regionW}>{regionId}</Cell>
      <Cell width={quantityW}>{order.volume_remain}</Cell>
      <Cell width={priceW}>
        {new Intl.NumberFormat("en-US").format(order.price)} ISK
      </Cell>
      <Cell width={locationW}>{order.location}</Cell>
      <Cell width={jumpsW}>{69}</Cell>
      <Cell width={expiresW}>{order.issued}</Cell>
      <Cell width={lastModifiedW}>{order.issued}</Cell>
    </Row>
  );
}
