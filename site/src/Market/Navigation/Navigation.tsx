import styled from 'styled-components';
import { Browse } from './Browse';
import { Search } from './Search';
import { Filters } from './Filters';

const Container = styled.div`
  min-width: 500px;
  width: auto;
  overflow: scroll;
  background-color: ${({ theme }) => theme.colors.emGrey};
  border-right: 2px solid ${({ theme }) => theme.colors.emDarkGrey};
  border-bottom: 2px solid ${({ theme }) => theme.colors.emDarkGrey};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
`;

const Separator = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  margin: 10px auto;
`;

export function Navigation() {
  return (
    <Container>
      <Search />
      <Separator />
      <Filters />
      <Separator />
      <Browse />
    </Container>
  );
}
