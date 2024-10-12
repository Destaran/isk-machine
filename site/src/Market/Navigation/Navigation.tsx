import styled from 'styled-components';
import { Browse } from './Browse';
import { Search } from './Search';
import { Filters } from './Filters';

const Container = styled.div`
  min-width: 500px;
  width: auto;
  overflow: scroll;
  background-color: ${({ theme }) => theme.colors.emGrey};
  border-right: 1px solid ${({ theme }) => theme.colors.emDarkGrey};
`;

export function Navigation() {
  return (
    <Container>
      <Search />
      <Filters />
      <Browse />
    </Container>
  );
}
