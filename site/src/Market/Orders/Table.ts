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
`;

export const Row = styled.div`
  display: flex;
  height: 25px;
  width: 100%;
`;

export const TableHead = styled(Row)`
  position: sticky;
  top: 0;
`;

interface CellProps {
  width?: string;
}

export const Cell = styled.div<CellProps>`
  display: flex;
  text-align: start;
  height: 25px;
  line-height: 25px;
  width: ${(props) => props.width ?? '10%'};
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.emGrey};
  color: white;
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
