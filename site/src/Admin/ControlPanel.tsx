import styled from 'styled-components';

const Container = styled.div`
  min-width: 500px;
  width: auto;
  overflow: scroll;
  background-color: ${({ theme }) => theme.colors.emGrey};
  border-right: 1px solid ${({ theme }) => theme.colors.emDarkGrey};
`;

export function ControlPanel() {
  return (
    <Container>
      <h1>Control Panel</h1>
    </Container>
  );
}
