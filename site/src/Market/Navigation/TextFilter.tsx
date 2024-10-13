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
  state: boolean;
  exclude?: boolean;
  defaultValue?: string;
}

export function TextFilter({ name, type, state, exclude, defaultValue }: Props) {
  const dispatch = useAppDispatch();

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setFilter({ filter: e.target.value, type }));
  }

  return (
    <Container>
      <Filter name={name} type={type} state={state} exclude={exclude} />
      <TextInput type="text" onChange={handleInput} defaultValue={defaultValue ?? ''} />
    </Container>
  );
}
