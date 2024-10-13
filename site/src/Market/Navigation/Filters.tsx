import { Filter } from './Filter';
import { TextFilter } from './TextFilter';
import { ExcludeFilter } from './ExcludeFIlter';
import { SectionTitle } from './SectionTitle';

export function Filters() {
  return (
    <div>
      <SectionTitle>Filters</SectionTitle>
      <ExcludeFilter />
      <TextFilter
        name="Location"
        type={'locationFilter'}
        defaultValue="Jita IV - Moon 4 - Caldari Navy"
      />
      <TextFilter name="Region" type={'regionFilter'} defaultValue="The Forge" />
      <Filter name="Market Hubs only" type={'marketHubsFilter'} />
    </div>
  );
}
