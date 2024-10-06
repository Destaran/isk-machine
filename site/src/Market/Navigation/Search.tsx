import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from '../../api/market/useSearch';
import { SearchResult } from '../../api/market/SearchResult';
import { SearchResults } from './SearchResults';

const Container = styled.div`
  padding: 5px;
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

  function handleSearchFocus({ target }: React.FocusEvent<HTMLInputElement>) {
    if (searchTerm.length === 0) {
      return;
    }

    target.select();
    setEnabled(true);
  }

  function handleSearch() {
    setEnabled(true);
  }

  function resetSearch() {
    setResults([]);
  }

  const { data, isFetched, isError } = useSearch(searchTerm, enabled);

  useEffect(() => {
    if (isFetched && data && enabled) {
      setResults(data);
      setEnabled(false);
    } else if (isError) {
      resetSearch();
      setEnabled(false);
    }
  }, [isFetched, data, enabled, isError]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        handleSearch();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <SearchInput
        onChange={(e) => handleChange(e)}
        placeholder="Search item..."
        onFocus={handleSearchFocus}
        value={searchTerm}
      />
      {results.length > 0 && <SearchResults results={results} resetSearch={resetSearch} />}
    </Container>
  );
}
