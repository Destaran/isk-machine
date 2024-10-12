import { PageBase } from '../components/PageBase';
import { ControlPanel } from './ControlPanel';
import { InfoPanel } from './InfoPanel';

export function Admin() {
  return (
    <PageBase>
      <ControlPanel />
      <InfoPanel />
    </PageBase>
  );
}
