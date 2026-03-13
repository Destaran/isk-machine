import { PageBase } from '../components/PageBase';
import { Opportunities } from './Opportunities';
import { Settings } from './Settings';

export function JitaFlipper() {
  return (
    <PageBase>
      <Settings />
      <Opportunities />
    </PageBase>
  );
}
