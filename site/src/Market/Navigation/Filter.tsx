import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { FilterKey, switchFilter } from '../../redux/orders/ordersSlice';

const Container = styled.div`
  display: flex;
`;

interface FilterNameProps {
  color: string;
}

const FilterName = styled.p<FilterNameProps>`
  color: ${(props) => props.color};
  margin: 5px 0;
`;

interface Props {
  name: string;
  type: FilterKey;
  color?: string;
}

export function Filter({ name, type, color = 'white' }: Props) {
  const dispatch = useAppDispatch();

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(switchFilter({ active: e.target.checked, type }));
  }

  return (
    <Container>
      <input type="checkbox" onChange={handleCheck} />
      <FilterName color={color ? color : 'white'}>{name}</FilterName>
    </Container>
  );
}
