import styled from "styled-components";
import { Group } from "./Group";
import { useMarketAllGroups } from "../hooks/markets/useMarketAllGroups";

const Container = styled.div``;

export function Browse() {
  const groupsQuery = useMarketAllGroups();

  const {
    data: groups,
    isError: groupsError,
    isLoading: groupsLoading,
  } = groupsQuery;

  if (groupsLoading) {
    return null;
  }

  if (groupsError || groups === null || !groups) {
    return null;
  }

  const groupsArray = Object.values(groups);

  return (
    <Container>
      {groupsArray.map((groupId) => (
        <Group key={groupId} groupId={groupId} />
      ))}
    </Container>
  );
}
