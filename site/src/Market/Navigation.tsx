import styled from 'styled-components';
import { Browse } from './Browse';
import { Filters } from './Filters';

const Container = styled.div`
  min-width: 500px;
  width: auto;
  min-height: 100vh;
  margin-right: 15px;
  overflow: scroll;
  background-color: #4b4b4b;
`;

export function Navigation() {
  return (
    <Container>
      <Filters />
      <Browse />
    </Container>
  );
}
