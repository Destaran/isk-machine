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
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.emGrey};
`;

const Title = styled.h1`
  background-image: linear-gradient(315deg, #e9e9e9 45%, ${theme.colors.orange} 50%, #e9e9e9 55%);
  background-size: 900%;
  background-clip: text;
  color: transparent;
  animation: ${BgAnim} 15s infinite;
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
