import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from '../../api/market/useSearch';
import { SearchResult } from '../../api/market/SearchResult';
import { SearchResults } from './SearchResults';
import { RxCross1 } from 'react-icons/rx';

const Container = styled.div`
  padding: 10px;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;
`;

const Title = styled.h3`
  color: white;
  font-family: Orbitron;
  margin-top: 0;
`;

const SearchInput = styled.input`
  width: 100%;
`;

const Cancel = styled(RxCross1)`
  position: absolute;
  right: 3px;
  height: 16px;
  width: 16px;
  color: #2b2b2b;

  &:hover {
    cursor: pointer;
  }
`;

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    if (searchTerm.length > 2) {
      setTimer(setTimeout(() => setEnabled(true), 500));
    }
  }

  function handleSearchFocus({ target }: React.FocusEvent<HTMLInputElement>) {
    if (searchTerm.length === 0) {
      return;
    }

    target.select();
    if (searchTerm.length > 2) {
      setEnabled(true);
    }
  }

  function resetSearch() {
    setResults([]);
    setEnabled(false);
  }

  function resetSearchTerm() {
    setSearchTerm('');
    resetSearch();
  }

  useEffect(() => {
    function handleTimeoutClear() {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        setEnabled(true);
        handleTimeoutClear();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [timer]);

  const { data, isFetched, isError } = useSearch(searchTerm, enabled);

  useEffect(() => {
    if (isFetched && data && enabled) {
      setResults(data);
      setEnabled(false);
    } else if (isError) {
      resetSearch();
    }
  }, [isFetched, data, enabled, isError]);

  return (
    <Container>
      <Title>Search</Title>
      <Wrapper>
        <SearchInput
          onChange={(e) => handleChange(e)}
          placeholder="Search item..."
          onFocus={handleSearchFocus}
          value={searchTerm}
        />
        {searchTerm.length > 0 && <Cancel onClick={resetSearchTerm} />}
        {results.length > 0 && <SearchResults results={results} resetSearch={resetSearch} />}
      </Wrapper>
    </Container>
  );
}
