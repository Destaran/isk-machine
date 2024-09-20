import styled from "styled-components";

export const Table = styled.div`
  display: block;
  width: 100%;
  height: 400px;
  overflow: scroll;
  border: 1px solid black;
  table-layout: fixed;
`;

export const Row = styled.div`
  display: flex;
  height: 25px;
  background-color: white;
  border-bottom: 1px black solid;
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
  text-align: start;
  height: 25px;
  line-height: 25px;
  width: ${(props) => props.width ?? "10%"};
  font-size: 12px;
`;

export const MarketTableColumnWidths = {
  regionW: "5%",
  quantityW: "5%",
  priceW: "10%",
  locationW: "30%",
  jumpsW: "10%",
  expiresW: "20%",
  lastModifiedW: "20%",
};
