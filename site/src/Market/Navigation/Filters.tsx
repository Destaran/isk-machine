import styled from 'styled-components';
import { Filter } from './Filter';
import { TextFilter } from './TextFilter';
import { ExcludeFilter } from './ExcludeFIlter';

const Container = styled.div`
  border-bottom: 2px solid #333;
  padding: 10px;
`;

const Title = styled.h3`
  color: white;
  font-family: Orbitron;
  margin-top: 0;
`;

export function Filters() {
  return (
    <Container>
      <Title>Filters</Title>
      <ExcludeFilter />
      <TextFilter
        name="Location"
        type={'locationFilter'}
        defaultValue="Jita IV - Moon 4 - Caldari Navy"
      />
      <TextFilter name="Region" type={'regionFilter'} defaultValue="The Forge" />
      <Filter name="Market Hubs only" type={'marketHubsFilter'} />
    </Container>
  );
}
