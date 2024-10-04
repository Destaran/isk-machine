import styled from 'styled-components';
import { Filter } from './Filter';
import { TextFilter } from './TextFilter';

const Container = styled.div``;

export function Filters() {
  return (
    <Container>
      <TextFilter
        name="Location"
        type={'locationFilter'}
        defaultValue="Jita IV - Moon 4 - Caldari Navy"
      />
      <TextFilter
        name="Region"
        type={'regionFilter'}
        defaultValue="The Forge"
      />
      <Filter name="Market Hubs only" type={'marketHubsFilter'} />
    </Container>
  );
}
