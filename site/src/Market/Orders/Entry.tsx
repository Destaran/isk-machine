import { Row, Cell } from "./Table";
import { format } from "date-fns";
import styled from "styled-components";
import { Order } from "../../api/market/MarketData";
import {
  regions,
  setFilter,
  stations,
  structures,
  systems,
} from "../../redux/orders/ordersSlice";
import { useAppSelector } from "../../redux/hooks";
import { useExpiresIn } from "../../hooks/useExpiresIn";
import { useAppDispatch } from "../../hooks/redux";
import { entryFilterStates } from "../../redux/orders/entryFilterStates";

interface Props {
  order: Order;
}

interface SecStatProps {
  $secStatus: string;
}

const SecStat = styled.span<SecStatProps>`
  margin: 0;
  margin-right: 10px;
  color: ${({ theme, $secStatus }) => theme.securityColors[$secStatus]};
  font-weight: bold;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;
`;

export function Entry({ order }: Props) {
  const dispatch = useAppDispatch();
  const filterStates = useAppSelector(entryFilterStates);
  const systemsData = useAppSelector(systems);
  const stationData = useAppSelector(stations);
  const structureData = useAppSelector(structures);

  let locationName = "Unknown";
  if (order.location_id.toString().length === 8) {
    locationName = stationData[order.location_id];
  }
  if (order.location_id.toString().length === 13) {
    if (structureData[order.location_id]) {
      locationName = `PLAYERSTRUC ${structureData[order.location_id]}`;
    } else {
      locationName = `${systemsData[order.system_id].name} - Unknown Player Structure`;
    }
  }
  const price = new Intl.NumberFormat("en-US").format(order.price);
  const issued = format(new Date(order.issued), "yyyy-MM-dd HH:mm:ss");
  const expiresIn = useExpiresIn(order.issued, order.duration);
  const regionName = useAppSelector(regions)[order.region_id];
  const secStatus = systemsData[order.system_id].security_status;

  function handleRegionClick() {
    dispatch(
      setFilter({
        type: "regionFilter",
        filter: regionName,
        active: !filterStates.regionFilter,
      }),
    );
  }

  function handleLocationClick() {
    dispatch(
      setFilter({
        type: "locationFilter",
        filter: locationName,
        active: !filterStates.locationFilter,
      }),
    );
  }

  return (
    <Row $interactive>
      <Cell onClick={() => handleRegionClick()} $interactive>
        {regionName}
      </Cell>
      <Cell>{order.volume_remain}</Cell>
      <Cell>{price} ISK</Cell>
      <Cell onClick={() => handleLocationClick()} $interactive>
        <SecStat $secStatus={secStatus}>{secStatus}</SecStat>
        <Text>{locationName}</Text>
      </Cell>
      <Cell>-</Cell>
      <Cell>{expiresIn}</Cell>
      <Cell>{issued}</Cell>
    </Row>
  );
}
