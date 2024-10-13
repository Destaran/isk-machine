import styled from 'styled-components';
import { type SearchResult } from '../../api/market/SearchResult';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.emGrey};
  border-radius: 5px;
  padding: 3px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.emLightGrey};
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
