import styled from 'styled-components';
import groupsData from '../../utils/market_groups_details.json';
import { GetMarketsGroupsMarketGroupIdResponse } from '../../hey-api';
import { MainGroup } from '../Lists/MainGroup';

const Container = styled.div`
  overflow: scroll;
  margin-top: 10px;
`;

export function Browse() {
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
            />
          );
        })}
    </Container>
  );
}
