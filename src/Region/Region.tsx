import styled from "styled-components";
import { useRegion } from "./useRegion";

const Container = styled.div``;

interface Props {
  id: number;
}

export function Region({ id }: Props) {
  const regionQuery = useRegion(id);

  const { data: region, isLoading, isError } = regionQuery;

  if (isLoading) {
    return <Container>loading region...</Container>;
  }

  if (isError || !region) {
    return <Container>couldn't load region {id}</Container>;
  }

  return <Container>{region.name}</Container>;
}
