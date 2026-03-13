import { Browse } from './Browse';
import { Search } from './Search';
import { Filters } from './Filters';
import { Container, Separator } from '../../components/pageElements';


export function Navigation() {
  return (
    <Container>
      <Search />
      <Separator />
      <Filters />
      <Separator />
      <Browse />
    </Container>
  );
}
