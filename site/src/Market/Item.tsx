import styled from 'styled-components';
import { PostUniverseNamesResponse } from '../hey-api';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTypeSelected } from '../hooks/universe/useTypeSelected';
import { setType } from '../redux/orders/ordersSlice';

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

  const { data: typeData, isFetched } = useTypeSelected(id, enabled);

  useEffect(() => {
    if (isFetched && typeData && enabled) {
      dispatch(setType(typeData));
      setEnabled(false);
    }
  }, [isFetched, typeData, enabled, dispatch]);

  return (
    <Container id={id.toString()} onClick={() => handleClick()}>
      - {name}
    </Container>
  );
}
