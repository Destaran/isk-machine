import styled from 'styled-components';

const Container = styled.div`
  min-width: 500px;
  width: auto;
  overflow: scroll;
  background-color: #4b4b4b;
  border-right: 1px solid #2b2b2b;
`;

export function ControlPanel() {
  return (
    <Container>
      <h1>Control Panel</h1>
    </Container>
  );
}
