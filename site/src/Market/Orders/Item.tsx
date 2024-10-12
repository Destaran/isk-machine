import styled from 'styled-components';
import { PostUniverseNamesResponse } from '../../hey-api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin-left: 20px;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  color: white;

  &:hover {
    background-color: grey;
  }
`;

interface Props {
  type: PostUniverseNamesResponse[number];
}

export function Item({ type }: Props) {
  const navigate = useNavigate();
  const { id, name } = type;

  function handleClick() {
    navigate(`/market/${id}`);
  }

  return (
    <Container id={id.toString()} onClick={() => handleClick()}>
      - {name}
    </Container>
  );
}
