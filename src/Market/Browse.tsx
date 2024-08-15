import styled from "styled-components";
import { useMarketGroups } from "../hooks/markets/useMarketGroups";
import { MainGroup } from "./MainGroup";

const Container = styled.div`
  overflow: scroll;
`;

interface Props {
  setTypeId: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Browse({ setTypeId }: Props) {
  const groupsQuery = useMarketGroups();

  const { data: groups, isLoading } = groupsQuery;

  if (groups === undefined || isLoading) {
    return null;
  }

  const mainGroups = groups.filter((group) => !group?.parent_group_id);

  return (
    <Container>
      {mainGroups.map((group) => (
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
