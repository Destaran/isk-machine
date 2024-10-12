import styled from 'styled-components';
import { type SearchResult } from '../../api/market/SearchResult';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.emGrey};

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;

interface Props {
  type: SearchResult;
  resetSearch: () => void;
}

export function SearchResult({ type, resetSearch }: Props) {
  const navigate = useNavigate();
  const { id, name } = type;

  function handleClick() {
    navigate(`/market/${id}`);
    resetSearch();
  }

  return (
    <Container id={id.toString()} onClick={() => handleClick()}>
      {name}
    </Container>
  );
}
