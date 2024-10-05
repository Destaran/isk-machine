import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Header } from './Header';

export function Navigation() {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
    </>
  );
}
