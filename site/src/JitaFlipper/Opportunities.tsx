import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { opportunities as selectOpportunities } from "../redux/orders/opportunitiesSlice";
import { Cell, Head, Row, Table } from "../Market/Orders/Table";

const Container = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: hidden;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.emGrey};
  border-radius: 5px;
`;

const OpportunitiesTable = styled(Table)`
  display: grid;
  grid-template-columns: repeat(5, max-content);
  min-width: 100%;
  width: max-content;
  flex: 1;
  min-height: 0;
  height: auto;
  overflow-x: auto;
  overflow-y: auto;
`;

const OpportunitiesRow = styled(Row)`
  display: contents;

  & > * {
    background-color: ${({ theme }) => theme.colors.emDarkGrey};
  }

  &:nth-child(even) > * {
    background-color: ${({ theme }) => theme.colors.emBlack};
  }

  &:hover > * {
    background-color: #3a2800;
  }
`;

const OpportunitiesHeader = styled(Head)`
  display: contents;

  & > * {
    background-color: ${({ theme }) => theme.colors.emBlack};
    position: sticky;
    top: 0;
    z-index: 1;
  }

  &:hover > * {
    background-color: ${({ theme }) => theme.colors.emBlack};
  }
`;

const baseCell = `
  width: auto;
  min-width: 0;
  min-height: 64px;
  height: auto;
  line-height: 1.3;
  padding: 4px 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const OpportunitiesCell = styled(Cell)`
  ${baseCell}
`;

const ItemCell = styled(OpportunitiesCell)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ItemIcon = styled.img`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
`;

const HeaderCell = styled(Cell)`
  ${baseCell}
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.emLightGrey};
`;

const NumericCell = styled(OpportunitiesCell)`
  justify-content: flex-end;
  font-variant-numeric: tabular-nums;
`;

interface MarginCellProps {
  $value: number;
}

const MarginCell = styled(NumericCell)<MarginCellProps>`
  color: ${({ $value }) =>
    $value > 0.1 ? "#00c853" : $value > 0.05 ? "#ffa500" : "#e9e9e9"};
  font-weight: ${({ $value }) => ($value > 0.1 ? "600" : "400")};
`;

export function Opportunities() {
  const opportunities = useAppSelector(selectOpportunities);

  const numberFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });
  const priceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const marginFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <Container>
      <OpportunitiesTable>
        <OpportunitiesHeader>
          <HeaderCell>Item name</HeaderCell>
          <HeaderCell>Best buy</HeaderCell>
          <HeaderCell>Best sell</HeaderCell>
          <HeaderCell>Margin</HeaderCell>
          <HeaderCell>Avg daily volume</HeaderCell>
        </OpportunitiesHeader>
        {opportunities.map((opp, index) => (
          <OpportunitiesRow key={index}>
            <ItemCell title={opp.item_name}>
              <ItemIcon
                src={`https://images.evetech.net/types/${opp.type_id}/icon?size=32`}
                alt={opp.item_name}
              />
              {opp.item_name}
            </ItemCell>
            <NumericCell title={priceFormatter.format(opp.best_buy)}>
              {priceFormatter.format(opp.best_buy)}
            </NumericCell>
            <NumericCell title={priceFormatter.format(opp.best_sell)}>
              {priceFormatter.format(opp.best_sell)}
            </NumericCell>
            <MarginCell
              $value={opp.net_margin}
              title={`${marginFormatter.format(opp.net_margin * 100)}%`}
            >
              {marginFormatter.format(opp.net_margin * 100)}%
            </MarginCell>
            <NumericCell
              title={numberFormatter.format(opp.avg_daily_trade_value)}
            >
              {numberFormatter.format(opp.avg_daily_trade_value)}
            </NumericCell>
          </OpportunitiesRow>
        ))}
      </OpportunitiesTable>
    </Container>
  );
}
