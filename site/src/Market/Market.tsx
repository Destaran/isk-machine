import { Navigation } from './Navigation/Navigation';
import { PageBase } from '../components/PageBase';
import { Lists } from './Lists/Lists';

export function Market() {
  return (
    <PageBase>
      <Navigation />
      <Lists />
    </PageBase>
  );
}
