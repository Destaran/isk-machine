import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from '../../api/market/useSearch';
import { SearchResult } from '../../api/market/SearchResult';
import { SearchResults } from './SearchResults';
import { RxCross1 } from 'react-icons/rx';
import { SectionTitle } from './SectionTitle';

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;

  &:first-of-type {
    margin-bottom: 8px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 3px;
  background-color: ${({ theme }) => theme.colors.emWhite};
  margin: 5px 0;
`;

const Cancel = styled(RxCross1)`
  position: absolute;
  right: 3px;
  height: 16px;
  width: 16px;
  color: ${({ theme }) => theme.colors.emDarkGrey};

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.p`
  margin-left: 5px;
`;

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [filterSkins, setFilterSkins] = useState<boolean>(true);

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

  function handleFilterSkinsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterSkins(e.target.checked);
    if (results.length > 2) {
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

    function handleEnter(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        setEnabled(true);
        handleTimeoutClear();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        resetSearch();
        handleTimeoutClear();
      }
    }
    document.addEventListener('keydown', handleEnter);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEnter);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [timer]);

  const { data, isFetched, isError } = useSearch(searchTerm, enabled);

  useEffect(() => {
    if (isFetched && data && enabled) {
      const filteredResults = filterSkins
        ? data.filter((result) => !result.name.includes('SKIN'))
        : data;
      setResults(filteredResults);
      setEnabled(false);
    } else if (isError) {
      resetSearch();
    }
  }, [isFetched, data, enabled, isError, filterSkins]);

  return (
    <div>
      <SectionTitle>Search</SectionTitle>
      <Wrapper>
        <input checked={filterSkins} type="checkbox" onChange={(e) => handleFilterSkinsChange(e)} />
        <Text>Filter SKINs</Text>
      </Wrapper>
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
    </div>
  );
}
