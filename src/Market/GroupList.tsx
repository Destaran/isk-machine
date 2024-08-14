import styled from "styled-components";
import { GetMarketsGroupsResponse } from "../hey-api";
import { useNames } from "../hooks/universe/useNames";

const Container = styled.div``;

interface Props {
  groups: GetMarketsGroupsResponse;
}

export function GroupList({ groups }: Props) {
  const groupsWithNamesQuery = useNames(groups);

  const {
    data: groupsWithNames,
    isError: groupsWithNamesError,
    isLoading: groupsWithNamesLoading,
  } = groupsWithNamesQuery;

  if (groupsWithNamesLoading) {
    return null;
  }

  if (groupsWithNamesError || groupsWithNames !== null) {
    return null;
  }

  console.log(groupsWithNames);

  return (
    <Container>
      {/* {groupsWithNames.map((group) => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
      ))} */}
    </Container>
  );
}
