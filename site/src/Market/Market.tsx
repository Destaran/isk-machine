import { Lists } from './Lists';
import { Navigation } from './Navigation';
import { PageBase } from '../components/PageBase';

export function Market() {
  return (
    <PageBase>
      <Navigation />
      <Lists />
    </PageBase>
  );
}
