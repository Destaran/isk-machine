import { TextFilter } from './TextFilter';
import { SectionTitle } from './SectionTitle';
import { useAppSelector } from '../../redux/hooks';
import { filterStates } from '../../redux/orders/ordersSlice';
import { NewFilter } from './NewFilter';

export function Filters() {
  const states = useAppSelector(filterStates);

  return (
    <div>
      <SectionTitle>Filters</SectionTitle>
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
      <TextFilter
        name="Location"
        type="locationFilter"
        defaultValue="Jita IV - Moon 4 - Caldari Navy"
      />
      <TextFilter name="Region" type={'regionFilter'} defaultValue="The Forge" />
      <NewFilter name="Market Hubs" type={'marketHubsFilter'} state={states.marketHubsFilter} />
    </div>
  );
}
