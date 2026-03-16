import styled from "styled-components";
import { OrdersList } from "./OrdersList";
import { useAppSelector } from "../../redux/hooks";
import { selectOrders } from "../../redux/orders/selectOrders";
import { ItemInfo } from "./ItemInfo";
import { scrapeDate, type as selectType } from "../../redux/orders/ordersSlice";
import { LastUpdated } from "./LastUpdated";
import { sortedSellOrders } from "../../redux/orders/sortedSellOrders";
import { sortedBuyOrders } from "../../redux/orders/sortedBuyOrders";
import { useSyncedOrderTableColumns } from "./useSyncedOrderTableColumns";

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
  const { buyTableRef, sellTableRef, columnsTemplate } =
    useSyncedOrderTableColumns({
      dependencies: [buyOrders, sellOrders, type],
    });

  return (
    <Container>
      <ItemInfo orders={orders} type={type} />
      <OrdersList
        orders={sellOrders ?? []}
        tableRef={sellTableRef}
        columnsTemplate={columnsTemplate}
      />
      <OrdersList
        orders={buyOrders ?? []}
        isBuy
        tableRef={buyTableRef}
        columnsTemplate={columnsTemplate}
      />
      {!!scrapeTimestamp && <LastUpdated timestamp={scrapeTimestamp} />}
    </Container>
  );
}
