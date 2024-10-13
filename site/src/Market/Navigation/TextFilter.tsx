import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { setFilter, TextFilterKey } from '../../redux/orders/ordersSlice';
import { Filter } from './Filter';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextInput = styled.input`
  margin: 0;
  padding: 0;
  height: 25px;
  width: 60%;
  background-color: ${({ theme }) => theme.colors.emWhite};
`;

interface Props {
  name: string;
  type: TextFilterKey;
  filterState: { filter: string; active: boolean };
  exclude?: boolean;
}

export function TextFilter({ name, type, filterState, exclude }: Props) {
  const dispatch = useAppDispatch();
  const { active: state, filter } = filterState;

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setFilter({ filter: e.target.value, type }));
  }

  return (
    <Container>
      <Filter name={name} type={type} state={state} exclude={exclude} />
      <TextInput value={filter} type="text" onChange={handleInput} />
    </Container>
  );
}
