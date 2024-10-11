import styled from 'styled-components';
import { ServerStatus } from './ServerStatus';

const Container = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  color: white;
  background-color: #4b4b4b;
  padding: 10px;
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
