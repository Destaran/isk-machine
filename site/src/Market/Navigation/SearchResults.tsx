import styled from 'styled-components';
import { type SearchResult as SearchResultType } from '../../api/market/SearchResult';
import { SearchResult } from './SearchResult';

const Container = styled.div`
  position: absolute;
  top: 32px;
  overflow: scroll;
  width: 100%;
  max-height: 1000px;
  background-color: ${({ theme }) => theme.colors.emGrey};
  border-radius: 5px;
  overflow: visible;
`;

interface Props {
  results: SearchResultType[];
  resetSearch: () => void;
}

export function SearchResults({ results, resetSearch }: Props) {
  return (
    <Container>
      {results.map((result) => (
        <SearchResult key={result.id} type={result} resetSearch={resetSearch} />
      ))}
    </Container>
  );
}
