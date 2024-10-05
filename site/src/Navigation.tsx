import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export function Navigation() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
