import styled from "styled-components";
import groupsData from "../utils/market_groups_details.json";
import { MainGroup } from "./MainGroup";
import {
  GetMarketsGroupsMarketGroupIdResponse,
  PostUniverseNamesResponse,
} from "../hey-api";

const Container = styled.div`
  overflow: scroll;
`;

interface Props {
  setTypeId: (type: PostUniverseNamesResponse[number]) => void;
}

export function Browse({ setTypeId }: Props) {
  const groups = groupsData as GetMarketsGroupsMarketGroupIdResponse[];

  const orderedGroups = groups
    .filter(
      (group): group is GetMarketsGroupsMarketGroupIdResponse =>
        group !== undefined
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const mainGroups = orderedGroups.filter((group) => !group?.parent_group_id);

  return (
    <Container>
      {mainGroups.length > 0 &&
        mainGroups.map((group) => {
          if (!group) {
            return null;
          }

          return (
            <MainGroup
              key={group?.market_group_id}
              group={group}
              groups={orderedGroups}
              setTypeId={setTypeId}
            />
          );
        })}
    </Container>
  );
}
