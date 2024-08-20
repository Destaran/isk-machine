import styled from "styled-components";
import {
  GetMarketsGroupsMarketGroupIdResponse,
  PostUniverseNamesResponse,
} from "../hey-api";
import { useState } from "react";
import { Group } from "./Group";

const Container = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  &:hover {
    background-color: aliceblue;
  }
`;

interface Props {
  group: GetMarketsGroupsMarketGroupIdResponse;
  groups: GetMarketsGroupsMarketGroupIdResponse[];
  setTypeId: (type: PostUniverseNamesResponse[number]) => void;
}

export function MainGroup({ group, groups, setTypeId }: Props) {
  const [open, setOpen] = useState(false);
  const children = groups.filter(
    (g) => g.parent_group_id === group.market_group_id
  );

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Container>
      <Wrapper>
        <h2 onClick={handleClick}>{group.name}</h2>
      </Wrapper>
      {open &&
        children.map((child) => (
          <Group
            key={child.market_group_id}
            group={child}
            groups={groups}
            setTypeId={setTypeId}
          />
        ))}
    </Container>
  );
}
