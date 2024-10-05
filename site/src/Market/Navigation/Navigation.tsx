import styled from 'styled-components';
import { Browse } from './Browse';
import { Search } from './Search';
import { Filters } from './Filters';

const Container = styled.div`
  min-width: 500px;
  width: auto;
  overflow: scroll;
  background-color: #4b4b4b;
  border-right: 1px solid #2b2b2b;
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
