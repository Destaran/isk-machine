import styled from 'styled-components';

const Container = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  color: white;
  background-color: #4b4b4b;
  padding: 15px 0;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
`;

export function Header() {
  return (
    <Container>
      <Wrapper>
        <Title>ISK Machine</Title>
      </Wrapper>
    </Container>
  );
}
