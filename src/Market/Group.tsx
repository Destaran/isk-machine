import styled from "styled-components";
import {
  GetMarketsGroupsMarketGroupIdResponse,
  PostUniverseNamesResponse,
} from "../hey-api";
import { useState } from "react";
import { Items } from "./Items";

const Container = styled.div`
  padding-left: 20px;
`;

const Wrapper = styled.div`
  border: 1px solid black;

  &:hover {
    background-color: aliceblue;
  }
`;

const Title = styled.p`
  margin: 0;
`;

interface Props {
  group: GetMarketsGroupsMarketGroupIdResponse;
  groups: GetMarketsGroupsMarketGroupIdResponse[];
  setTypeId: (type: PostUniverseNamesResponse[number]) => void;
}

export function Group({ group, groups, setTypeId }: Props) {
  const [showGroups, setShowGroups] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const children = groups.filter(
    (g) => g.parent_group_id === group.market_group_id
  );
  const lastChild = children.length === 0;

  function handleClick() {
    if (lastChild) {
      setShowItems(!showItems);
      return;
    }

    setShowGroups(!showGroups);
  }

  return (
    <Container>
      <Wrapper onClick={handleClick}>
        <Title>{group.name}</Title>
      </Wrapper>
      {showGroups &&
        children.map((child) => (
          <Group
            key={child.market_group_id}
            group={child}
            groups={groups}
            setTypeId={setTypeId}
          />
        ))}
      {showItems && <Items setTypeId={setTypeId} types={group.types} />}
    </Container>
  );
}
