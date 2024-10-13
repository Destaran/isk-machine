import { SectionTitle } from './SectionTitle';
import { useAppSelector } from '../../redux/hooks';
import { filterStates } from '../../redux/orders/ordersSlice';
import { NewFilter } from './NewFilter';
import { NewTextFilter } from './NewTextFilter';
import styled from 'styled-components';

const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  margin: 10px auto;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export function Filters() {
  const states = useAppSelector(filterStates);

  return (
    <div>
      <SectionTitle>Filters</SectionTitle>
      <Wrapper>
        <NewFilter
          name="Null Sec"
          type="excludeNullSecFilter"
          state={states.excludeNullSecFilter}
          exclude
        />
        <NewFilter
          name="Low Sec"
          type="excludeLowSecFilter"
          state={states.excludeLowSecFilter}
          exclude
        />
        <NewFilter
          name="High Sec"
          type="excludeHighSecFilter"
          state={states.excludeHighSecFilter}
          exclude
        />
      </Wrapper>
      <Separator />
      <Wrapper>
        <NewFilter
          name="Stations"
          type="excludeStationsFilter"
          state={states.excludeStationsFilter}
          exclude
        />
        <NewFilter
          name="Structures"
          type="excludeStructuresFilter"
          state={states.excludeStructuresFilter}
          exclude
        />
      </Wrapper>
      <Separator />

      <NewTextFilter
        name="Location"
        type="locationFilter"
        state={states.locationFilter}
        defaultValue="Jita IV - Moon 4 - Caldari Navy"
      />
      <NewTextFilter
        name="Region"
        type={'regionFilter'}
        state={states.regionFilter}
        defaultValue="The Forge"
      />
      <NewFilter name="Hubs" type={'marketHubsFilter'} state={states.marketHubsFilter} />
    </div>
  );
}
