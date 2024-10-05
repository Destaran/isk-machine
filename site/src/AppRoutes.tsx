import { Route, Routes } from 'react-router-dom';
import { Market } from './Market/Market';
import { Navigation } from './Navigation';
import { Landing } from './Landing/Landing';
import { JitaFlipper } from './JitaFlipper/JitaFlipper';
import { Admin } from './Admin/Admin';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Landing />} />
        <Route path="market" element={<Market />} />
        <Route path="market/:id" element={<Market />} />
        <Route path="jita-flipper" element={<JitaFlipper />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
