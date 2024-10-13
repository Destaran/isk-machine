import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: auto;
  margin: 2px 15px 2px 15px;
`;

interface NavlinkProps {
  $active: boolean;
}

const NavLink = styled(Link)<NavlinkProps>`
  margin: 0;
  text-decoration: none;
  padding: 0px;
  color: ${({ $active, theme }) => ($active ? theme.colors.orange : '')};
  cursor: pointer;
  transition: all 500ms;

  &:hover {
    color: ${({ theme }) => theme.colors.orange};
    transition: all 250ms;
  }
`;

interface Props {
  destination: string;
  title: string;
}

export function Button({ destination, title }: Props) {
  const { pathname } = useLocation();
  const active = pathname.includes(destination);

  return (
    <Wrapper>
      <NavLink to={`${destination}`} $active={active}>
        {title}
      </NavLink>
    </Wrapper>
  );
}
