import { ActionCreatorWithPayload } from '@reduxjs/toolkit/react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const FilterName = styled.p`
  color: white;
`;

interface Props {
  name: string;
  action: ActionCreatorWithPayload<boolean>;
}

export function Filter({ name, action }: Props) {
  const dispatch = useDispatch();

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(action(e.target.checked));
  }

  return (
    <Container>
      <FilterName>{name}</FilterName>
      <input type="checkbox" onChange={handleCheck} />
    </Container>
  );
}
