import styled from 'styled-components';
import { Filter } from './Filter';

const Container = styled.div``;

export function Filters() {
  return (
    <Container>
      <Filter name="Market Hubs only" type={'marketHubsFilter'} />
    </Container>
  );
}
