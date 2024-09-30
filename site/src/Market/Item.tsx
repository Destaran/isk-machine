import styled from 'styled-components';
import { PostUniverseNamesResponse } from '../hey-api';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useData } from '../api/market/useData';
import { setData } from '../redux/orders/ordersSlice';

const Container = styled.div`
  margin-left: 20px;
  background-color: #2b2b2b;
  color: white;

  &:hover {
    background-color: grey;
  }
`;

interface Props {
  type: PostUniverseNamesResponse[number];
}

export function Item({ type }: Props) {
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const { id, name } = type;

  function handleClick() {
    setEnabled(true);
  }

  const { data, isFetched } = useData(id, enabled);

  useEffect(() => {
    if (isFetched && data && enabled) {
      dispatch(setData(data));
      setEnabled(false);
    }
  }, [isFetched, enabled, dispatch, data]);

  return (
    <Container id={id.toString()} onClick={() => handleClick()}>
      - {name}
    </Container>
  );
}
