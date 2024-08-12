import styled from "styled-components";
import { useMarketGroup } from "./useMarketGroup";

const Container = styled.div``;

interface Props {
  id: number;
}

export function MarketGroup({ id }: Props) {
  const marketGroupQuery = useMarketGroup(id);

  const { data: marketGroup, isLoading, isError } = marketGroupQuery;

  if (isLoading) {
    return <Container>loading market group...</Container>;
  }

  if (isError || !marketGroup) {
    return <Container>Error loading id:{id}</Container>;
  }

  return (
    <Container>
      <p>{marketGroup.name}</p>
    </Container>
  );
}
