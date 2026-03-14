import styled from "styled-components";
import { usePersistedScroll } from "../hooks/usePersistedScroll";
import { useAppSelector } from "../redux/hooks";
import { opportunities as selectOpportunities } from "../redux/orders/opportunitiesSlice";
import { Cell, Head, Table } from "../Market/Orders/Table";
import { OpportunityRow } from "./OpportunityRow";

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
  grid-template-columns: repeat(4, max-content);
  min-width: 100%;
  width: max-content;
  flex: 1;
  min-height: 0;
  height: auto;
  overflow-x: auto;
  overflow-y: auto;
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

const HeaderCell = styled(Cell)`
  width: auto;
  min-width: 0;
  min-height: 64px;
  height: auto;
  line-height: 1.3;
  padding: 4px 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.emLightGrey};
`;

export function Opportunities() {
  const opportunities = useAppSelector(selectOpportunities);
  const tableRef = usePersistedScroll("opportunities-scroll");

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
      <OpportunitiesTable ref={tableRef}>
        <OpportunitiesHeader>
          <HeaderCell>Item name</HeaderCell>
          <HeaderCell>Best buy / Best sell</HeaderCell>
          <HeaderCell>Margin</HeaderCell>
          <HeaderCell>Avg daily volume</HeaderCell>
        </OpportunitiesHeader>
        {opportunities.map((opp, index) => (
          <OpportunityRow
            key={index}
            opp={opp}
            numberFormatter={numberFormatter}
            priceFormatter={priceFormatter}
            marginFormatter={marginFormatter}
          />
        ))}
      </OpportunitiesTable>
    </Container>
  );
}
