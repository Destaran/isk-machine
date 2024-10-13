import styled from 'styled-components';
import { ServerStatus } from './ServerStatus';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.emGrey};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
`;

const Title = styled.h1`
  margin: 0;
  font-family: Orbitron;
`;

export function Header() {
  return (
    <Container>
      <Title>EVE Magnate</Title>
      <ServerStatus />
    </Container>
  );
}
