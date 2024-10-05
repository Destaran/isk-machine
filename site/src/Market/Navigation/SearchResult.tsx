import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useData } from '../../api/market/useData';
import { setData } from '../../redux/orders/ordersSlice';
import { type SearchResult } from '../../api/market/SearchResult';

const Container = styled.div`
  background-color: #2b2b2b;
  color: white;

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
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const { id, name } = type;

  function handleClick() {
    setEnabled(true);
  }

  const { data, isFetched, isError } = useData(Number(id), enabled);

  useEffect(() => {
    if (isFetched && data && enabled) {
      dispatch(setData(data));
      setEnabled(false);
      resetSearch();
    } else if (isError) {
      setEnabled(false);
    }
  }, [isFetched, enabled, dispatch, data, isError, resetSearch]);

  return (
    <Container id={id.toString()} onClick={() => handleClick()}>
      {name}
    </Container>
  );
}
