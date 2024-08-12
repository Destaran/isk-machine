import styled from "styled-components";
import { useMarketGroups } from "./useMarketGroups";
import { MarketGroup } from "./MarketGroup";

const Container = styled.div``;

export function MarketGroups() {
  const marketGroupsQuery = useMarketGroups();

  const { data: marketGroups, isLoading, isError } = marketGroupsQuery;

  if (isLoading) {
    return <Container>loading market groups...</Container>;
  }

  if (isError || !marketGroups) {
    return <Container>couldn't load market groups</Container>;
  }

  return (
    <Container>
      {marketGroups.map((marketGroupId) => {
        return <MarketGroup id={marketGroupId} key={marketGroupId} />;
      })}
    </Container>
  );
}
