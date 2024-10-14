import styled from 'styled-components';

export const Table = styled.div`
  display: block;
  width: 100%;
  height: 400px;
  overflow: scroll;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.emDarkGrey};
  table-layout: fixed;
  overflow-x: hidden;
  overflow-y: auto;
`;

interface RowProps {
  $interactive?: boolean;
}

export const Row = styled.div<RowProps>`
  display: flex;
  height: 25px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};

  &:hover {
    background-color: ${({ theme, $interactive }) =>
      $interactive ? theme.colors.emBlack : theme.colors.emDarkGrey};
  }
`;

export const TableHead = styled(Row)`
  position: sticky;
  top: 0;
`;

interface CellProps {
  width?: string;
  $interactive?: boolean;
}

export const Cell = styled.div<CellProps>`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 25px;
  line-height: 25px;
  width: ${(props) => props.width ?? '10%'};
  font-size: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.emGrey};

  &:hover {
    cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
    color: ${({ theme, $interactive }) =>
      $interactive ? theme.colors.orange : theme.colors.emWhite};
  }
`;

export const MarketTableColumnWidths = {
  regionW: '5%',
  quantityW: '5%',
  priceW: '10%',
  locationW: '55%',
  jumpsW: '5%',
  expiresW: '10%',
  lastModifiedW: '10%',
};
