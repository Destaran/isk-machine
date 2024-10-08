import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from '../../api/market/useSearch';
import { SearchResult } from '../../api/market/SearchResult';
import { SearchResults } from './SearchResults';
import { RxCross1 } from 'react-icons/rx';

const Container = styled.div`
  padding: 5px;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  min-width: 400px;
`;

const SearchInput = styled.input`
  width: 400px;
`;

const Cancel = styled(RxCross1)`
  position: relative;
  right: 20px;
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

  function resetSearch() {
    setResults([]);
    setEnabled(false);
  }

  function resetSearchTerm() {
    setSearchTerm('');
    resetSearch();
  }

  const { data, isFetched, isError } = useSearch(searchTerm, enabled);

  useEffect(() => {
    if (isFetched && data && enabled) {
      setResults(data);
      setEnabled(false);
    } else if (isError) {
      resetSearch();
    }
  }, [isFetched, data, enabled, isError]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        setEnabled(true);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <Wrapper>
        <SearchInput
          onChange={(e) => handleChange(e)}
          placeholder="Search item..."
          onFocus={handleSearchFocus}
          value={searchTerm}
        />
        {searchTerm.length > 0 && <Cancel onClick={resetSearchTerm} />}
      </Wrapper>
      {results.length > 0 && <SearchResults results={results} resetSearch={resetSearch} />}
    </Container>
  );
}
