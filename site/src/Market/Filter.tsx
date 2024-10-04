import styled from 'styled-components';
import { useAppDispatch } from '../redux/hooks';
import { FilterKey, switchFilter } from '../redux/orders/ordersSlice';

const Container = styled.div`
  display: flex;
`;

const FilterName = styled.p`
  color: white;
`;

interface Props {
  name: string;
  type: FilterKey;
}

export function Filter({ name, type }: Props) {
  const dispatch = useAppDispatch();

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(switchFilter({ active: e.target.checked, type }));
  }

  return (
    <Container>
      <FilterName>{name}</FilterName>
      <input type="checkbox" onChange={handleCheck} />
    </Container>
  );
}
