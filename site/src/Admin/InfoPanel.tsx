import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.emGrey};
`;

export function InfoPanel() {
  return (
    <Container>
      <h1>Info Panel</h1>
    </Container>
  );
}
