import styled, { keyframes } from 'styled-components';
import { ServerStatus } from './ServerStatus';
import { theme } from './style/theme';

const BgAnim = keyframes`
from {
  background-position: left;
} 
to {
  background-position: right;
}
`;

const Container = styled.div`
  /* background-color: ${({ theme }) => theme.colors.emGrey}; */
  background-image: linear-gradient(315deg, #4d4d4d 45%, ${theme.colors.orange} 50%, #4d4d4d 55%);
  background-size: 1800%;
  animation: ${BgAnim} 30s infinite;
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
