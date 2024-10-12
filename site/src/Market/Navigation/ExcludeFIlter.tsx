import styled from 'styled-components';
import { Filter } from './Filter';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div``;

const Text = styled.p`
  margin-right: 20px;
`;

export function ExcludeFilter() {
  return (
    <Container>
      <Text>Exclude</Text>
      <Wrapper>
        <Filter name="Null Sec" type={'excludeNullSecFilter'} color="red" />
        <Filter name="Low Sec" type={'excludeLowSecFilter'} color="orange" />
        <Filter name="High Sec" type={'excludeHighSecFilter'} color="cyan" />
        <Filter name="NPC Stations" type={'excludeStationsFilter'} />
        <Filter name="Player Structures" type={'excludeStructuresFilter'} />
      </Wrapper>
    </Container>
  );
}
