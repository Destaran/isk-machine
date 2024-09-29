import styled from 'styled-components';
import { Lists } from './Lists';
import { Navigation } from './Navigation';

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  background-color: #2b2b2b;
`;

export function Market() {
  return (
    <Container>
      <Navigation />
      <Lists />
    </Container>
  );
}
