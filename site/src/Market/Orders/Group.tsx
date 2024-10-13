import styled from 'styled-components';
import { useState } from 'react';
import { Items } from './Items';
import { GetMarketsGroupsMarketGroupIdResponse } from '../../hey-api';

const Container = styled.div`
  padding-left: 20px;
`;

const Wrapper = styled.div`
  padding: 1px;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};

  &:hover {
    background-color: ${({ theme }) => theme.colors.emLightGrey};
  }
`;

const Title = styled.p`
  margin: 0;
`;

interface Props {
  group: GetMarketsGroupsMarketGroupIdResponse;
  groups: GetMarketsGroupsMarketGroupIdResponse[];
}

export function Group({ group, groups }: Props) {
  const [showGroups, setShowGroups] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const children = groups.filter((g) => g.parent_group_id === group.market_group_id);
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
        <Title> {`${showGroups || showItems ? '▾' : '▸'} ${group.name}`}</Title>
      </Wrapper>
      {showGroups &&
        children.map((child) => (
          <Group key={child.market_group_id} group={child} groups={groups} />
        ))}
      {showItems && <Items types={group.types} />}
    </Container>
  );
}
