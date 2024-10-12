import styled from 'styled-components';
import { useState } from 'react';
import { Group } from '../Orders/Group';
import { GetMarketsGroupsMarketGroupIdResponse } from '../../hey-api';

const Container = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.emGrey};
  &:hover {
    background-color: grey;
  }
`;

const Title = styled.p`
  margin: 0;
`;

interface Props {
  group: GetMarketsGroupsMarketGroupIdResponse;
  groups: GetMarketsGroupsMarketGroupIdResponse[];
}

export function MainGroup({ group, groups }: Props) {
  const [open, setOpen] = useState(false);
  const children = groups.filter((g) => g.parent_group_id === group.market_group_id);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Container>
      <Wrapper>
        <Title onClick={handleClick}>{`${open ? '▾' : '▸'} ${group.name}`}</Title>
      </Wrapper>
      {open &&
        children.map((child) => (
          <Group key={child.market_group_id} group={child} groups={groups} />
        ))}
    </Container>
  );
}
