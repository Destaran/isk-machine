import styled from "styled-components";
import { useType } from "../hooks/universe/useType";

const Container = styled.div``;

interface Props {
  typeId: number;
}

export function Title({ typeId }: Props) {
  const typeQuery = useType(typeId);

  const { data: response, isLoading } = typeQuery;

  if (isLoading || !response || !response.data) {
    return null;
  }

  const type = response.data;

  return (
    <Container>
      <h1>{type.name}</h1>
    </Container>
  );
}
