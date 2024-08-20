import styled from "styled-components";
import { useMarketGroups } from "../hooks/markets/useMarketGroups";
import { MainGroup } from "./MainGroup";
import { PostUniverseNamesResponse } from "../hey-api";

const Container = styled.div`
  overflow: scroll;
`;

interface Props {
  setTypeId: (type: PostUniverseNamesResponse[number]) => void;
}

export function Browse({ setTypeId }: Props) {
  const groupsQuery = useMarketGroups();

  const { data: groups, isPending, isError } = groupsQuery;

  if (groups === undefined || isPending || isError) {
    return null;
  }

  const orderedGroups = groups.sort((a, b) => a?.name.localeCompare(b?.name));

  const mainGroups = orderedGroups.filter((group) => !group.parent_group_id);

  return (
    <Container>
      {mainGroups.length > 0 &&
        mainGroups.map((group) => (
          <MainGroup
            key={group?.market_group_id}
            group={group}
            groups={groups}
            setTypeId={setTypeId}
          />
        ))}
    </Container>
  );
}
