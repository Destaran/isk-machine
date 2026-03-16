import styled from "styled-components";

interface TableProps {
  $columnsTemplate?: string;
}

export const Table = styled.div<TableProps>`
  display: grid;
  grid-template-columns: ${({ $columnsTemplate }) =>
    $columnsTemplate ?? "repeat(7, max-content)"};
  align-content: start;
  min-width: 100%;
  width: max-content;
  height: 400px;
  overflow: auto;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.emDarkGrey};
  overflow-x: auto;
  overflow-y: auto;
`;

interface RowProps {
  $interactive?: boolean;
}

export const Row = styled.div<RowProps>`
  display: contents;

  &:hover > * {
    background-color: ${({ theme, $interactive }) =>
      $interactive ? theme.colors.emBlack : theme.colors.emDarkGrey};
  }
`;

export const Head = styled(Row)`
  & > * {
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

interface CellProps {
  $interactive?: boolean;
}

export const Cell = styled.div<CellProps>`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 25px;
  line-height: 25px;
  width: auto;
  padding: 0 6px;
  white-space: nowrap;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.emGrey};

  &:hover {
    cursor: ${({ $interactive }) => ($interactive ? "pointer" : "default")};
    color: ${({ theme, $interactive }) =>
      $interactive ? theme.colors.orange : theme.colors.emWhite};
  }
`;
