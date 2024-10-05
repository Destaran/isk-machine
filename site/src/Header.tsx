import styled from 'styled-components';

const Container = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  color: white;
  background-color: #4b4b4b;
  padding: 2px 0 2px 0;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
`;

export function Header() {
  return (
    <Container>
      <Wrapper>
        <h1>ISK Machine</h1>
      </Wrapper>
    </Container>
  );
}
