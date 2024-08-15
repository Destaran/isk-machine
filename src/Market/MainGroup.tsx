import styled from "styled-components";
import { GetMarketsGroupsMarketGroupIdResponse } from "../hey-api";
import { useState } from "react";
import { Group } from "./Group";

const Container = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  group: GetMarketsGroupsMarketGroupIdResponse;
  groups: GetMarketsGroupsMarketGroupIdResponse[];
}

export function MainGroup({ group, groups }: Props) {
  const [open, setOpen] = useState(false);
  const children = groups.filter(
    (g) => g.parent_group_id === group.market_group_id
  );

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Container>
      <h2 onClick={handleClick}>{group.name}</h2>
      {open &&
        children.map((child) => (
          <Group key={child.market_group_id} group={child} groups={groups} />
        ))}
    </Container>
  );
}
