import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from '../api/market/useSearch';
import { SearchResult } from '../api/market/SearchResult';
import { SearchResults } from './SearchResults';

const Container = styled.div``;

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
    }
  }, [isFetched, enabled, data, isError]);

  return (
    <Container>
      <input onChange={(e) => handleChange(e)} />
      <button onClick={handleSearch}>Search</button>
      {results.length > 0 && (
        <SearchResults results={results} resetSearch={resetSearch} />
      )}
    </Container>
  );
}
