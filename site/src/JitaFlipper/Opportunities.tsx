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
  flex: 1;
  min-height: 0;
  height: auto;
  overflow-x: auto;
  overflow-y: auto;
`;

const OpportunitiesRow = styled(Row)`
  min-height: 32px;
  height: auto;
`;

const OpportunitiesCell = styled(Cell)`
  min-width: 0;
  min-height: 32px;
  height: auto;
  line-height: 1.3;
  padding: 4px 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
        <Head as={OpportunitiesRow}>
          <OpportunitiesCell width="35%">Item name</OpportunitiesCell>
          <OpportunitiesCell width="15%">Best buy</OpportunitiesCell>
          <OpportunitiesCell width="15%">Best sell</OpportunitiesCell>
          <OpportunitiesCell width="10%">Margin</OpportunitiesCell>
          <OpportunitiesCell width="25%">
            Average daily trade volume
          </OpportunitiesCell>
        </Head>
        {opportunities.map((opp, index) => (
          <OpportunitiesRow key={index}>
            <OpportunitiesCell title={opp.item_name} width="35%">
              {opp.item_name}
            </OpportunitiesCell>
            <OpportunitiesCell
              title={priceFormatter.format(opp.best_buy)}
              width="15%"
            >
              {priceFormatter.format(opp.best_buy)}
            </OpportunitiesCell>
            <OpportunitiesCell
              title={priceFormatter.format(opp.best_sell)}
              width="15%"
            >
              {priceFormatter.format(opp.best_sell)}
            </OpportunitiesCell>
            <OpportunitiesCell
              title={`${marginFormatter.format(opp.net_margin * 100)}%`}
              width="10%"
            >
              {marginFormatter.format(opp.net_margin * 100)}%
            </OpportunitiesCell>
            <OpportunitiesCell
              title={numberFormatter.format(opp.avg_daily_trade_value)}
              width="25%"
            >
              {numberFormatter.format(opp.avg_daily_trade_value)}
            </OpportunitiesCell>
          </OpportunitiesRow>
        ))}
      </OpportunitiesTable>
    </Container>
  );
}
