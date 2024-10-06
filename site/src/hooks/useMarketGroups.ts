import { GetMarketsGroupsMarketGroupIdResponse } from '../hey-api/types.gen';
import groupsData from '../utils/market_groups_details.json';

const marketGroups = groupsData as GetMarketsGroupsMarketGroupIdResponse[];

function getGroupRecursive(group: GetMarketsGroupsMarketGroupIdResponse, groups: string[]) {
  const parent = marketGroups.find((g) => g.market_group_id === group.parent_group_id);
  if (parent) {
    groups.push(parent.name);
    getGroupRecursive(parent, groups);
  }
}

export function useMarketGroups(typeId: number) {
  const groups: string[] = [];
  const parent = marketGroups.find((group) => group.types.includes(typeId));
  if (!parent) {
    return;
  }
  getGroupRecursive(parent, groups);
  const string = groups.reverse().join(' > ');
  return string;
}
