import styled from 'styled-components';
import { useAppDispatch } from '../redux/hooks';
import { FilterKey, switchFilter } from '../redux/orders/ordersSlice';

const Container = styled.div`
  display: flex;
`;

const FilterName = styled.p`
  color: white;
  margin: 10px 0;
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
      <input type="checkbox" onChange={handleCheck} />
      <FilterName>{name}</FilterName>
    </Container>
  );
}
