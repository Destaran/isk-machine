import styled from "styled-components";
import { usePersistedScroll } from "../hooks/usePersistedScroll";
import { useAppSelector } from "../redux/hooks";
import { opportunities as selectOpportunities } from "../redux/orders/opportunitiesSlice";
import { Cell, Head, Table } from "../Market/Orders/Table";
import { OpportunitiesInfo } from "./OpportunitiesInfo.tsx";
import { OpportunityRow } from "./OpportunityRow";

const Container = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.emGrey};
  border-radius: 8px;
`;

const InfoPanel = styled.div`
  min-width: 0;
`;

const TablePanel = styled.div`
  min-width: 0;
  min-height: 0;
  flex: 1;
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.emDarkGrey};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
`;

const OpportunitiesTable = styled(Table)`
  grid-template-columns: repeat(4, max-content);
  flex: 1;
  align-self: stretch;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  min-height: 0;
  height: 100%;
  border: none;
`;

const OpportunitiesHeader = styled(Head)`
  display: contents;

  & > * {
    background-color: ${({ theme }) => theme.colors.emDarkGrey};
    position: sticky;
    top: 0;
    z-index: 1;
  }

  &:hover > * {
    background-color: ${({ theme }) => theme.colors.emDarkGrey};
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
  color: ${({ theme }) => theme.colors.emWhite};
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
      <InfoPanel>
        <OpportunitiesInfo />
      </InfoPanel>
      <TablePanel>
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
      </TablePanel>
    </Container>
  );
}
