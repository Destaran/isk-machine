import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from '../../api/market/useSearch';
import { SearchResult } from '../../api/market/SearchResult';
import { SearchResults } from './SearchResults';

const Container = styled.div`
  margin-top: 10px;
`;

const SearchInput = styled.input`
  width: 400px;
`;

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [enabled, setEnabled] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSearch() {
    setEnabled(true);
  }

  function resetSearch() {
    setSearchTerm('');
    setResults([]);
  }

  const { data, isFetched, isError } = useSearch(searchTerm, enabled);

  useEffect(() => {
    if (isFetched && data && enabled) {
      setResults(data);
      setEnabled(false);
    } else if (isError) {
      setEnabled(false);
      resetSearch();
    }
  }, [isFetched, data, enabled, isError]);

  return (
    <Container>
      <SearchInput
        onChange={(e) => handleChange(e)}
        placeholder="Search item..."
      />
      <button onClick={handleSearch}>Search</button>
      {results.length > 0 && (
        <SearchResults results={results} resetSearch={resetSearch} />
      )}
    </Container>
  );
}
