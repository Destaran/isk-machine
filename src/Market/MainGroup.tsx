import styled from "styled-components";
import {
  GetMarketsGroupsMarketGroupIdResponse,
  PostUniverseNamesResponse,
} from "../hey-api";
import { useState } from "react";
import { Group } from "./Group";

const Container = styled.div`
  cursor: pointer;
`;

const Wrapper = styled.div`
  border: 1px solid black;
  height: 100%;
  width: 100%;
  &:hover {
    background-color: aliceblue;
  }
`;

const Title = styled.h2`
  margin: 0;
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
        <Title onClick={handleClick}>{group.name}</Title>
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
