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
  cursor: pointer;
  transition: all 0.5s;
  color: ${(props) => (props.$active ? 'orange' : 'white')};

  &:active {
    color: orange;
    transition: all 0.03s;
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
