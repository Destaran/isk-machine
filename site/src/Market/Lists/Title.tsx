import styled from "styled-components";

const Container = styled.div``;

interface Props {
  name: string;
}

export function Title({ name }: Props) {
  return (
    <Container>
      <h1>{name}</h1>
    </Container>
  );
}
