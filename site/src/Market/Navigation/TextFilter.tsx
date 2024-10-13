import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { setFilter, switchFilter, TextFilterKey } from '../../redux/orders/ordersSlice';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  min-width: 150px;
`;

const FilterName = styled.p`
  margin: 10px 5px;
`;

const TextInput = styled.input`
  margin: 0;
  padding: 0;
  height: 25px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.emWhite};
`;

interface Props {
  name: string;
  type: TextFilterKey;
  defaultValue?: string;
}

export function TextFilter({ name, type, defaultValue }: Props) {
  const dispatch = useAppDispatch();

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(switchFilter({ active: e.target.checked, type }));
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setFilter({ filter: e.target.value, type }));
  }

  return (
    <Container>
      <Wrapper>
        <input type="checkbox" onChange={handleCheck} />
        <FilterName>{name}</FilterName>
      </Wrapper>
      <TextInput type="text" onChange={handleInput} defaultValue={defaultValue} />
    </Container>
  );
}
