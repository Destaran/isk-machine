import { Link } from 'react-router-dom';
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
  $isactive: boolean;
}

const NavLink = styled(Link)<NavlinkProps>`
  margin: 0;
  text-decoration: none;
  padding: 0px;
  cursor: pointer;
  transition: all 1s;
  color: white;

  &:hover {
    color: white;
    transition: all 0.3s;
  }

  &:active {
    transform: scale(0.95);
    color: white;
    transition: all 0.03s;
  }
`;

interface Props {
  destination: string;
  title: string;
}

function checkPath(path: string) {
  if (path === location.pathname) {
    return true;
  } else {
    return false;
  }
}

export function Button({ destination, title }: Props) {
  return (
    <Wrapper>
      <NavLink to={`/${destination}`} $isactive={checkPath(`/${destination}`)}>
        {title}
      </NavLink>
    </Wrapper>
  );
}
