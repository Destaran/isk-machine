import styled from "styled-components";
import { useType } from "../hooks/universe/useType";

const Container = styled.div`
  margin: 20px;
`;

interface Props {
  id: number;
}

export function Item({ id }: Props) {
  const { data: response, isLoading } = useType(id);

  if (isLoading || response === undefined) {
    return null;
  }

  const item = response.data;

  return <Container>{item?.name}</Container>;
}
