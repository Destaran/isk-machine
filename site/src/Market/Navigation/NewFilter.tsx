import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { FilterKey, switchFilter, TextFilterKey } from '../../redux/orders/ordersSlice';

const Container = styled.div`
  display: flex;
`;

interface ButtonProps {
  type: FilterKey | TextFilterKey;
  $state: boolean;
}

const Button = styled.button<ButtonProps>`
  color: ${({ type, theme, $state }) => ($state ? theme.colors.filters[type] : 'white')};
  background-color: black;
`;

interface Props {
  name: string;
  type: FilterKey;
  state: boolean;
  exclude?: boolean;
}

export function NewFilter({ name, type, state, exclude }: Props) {
  const dispatch = useAppDispatch();

  function handleCheck() {
    dispatch(switchFilter({ active: !state, type }));
  }

  return (
    <Container>
      <Button type={type} $state={exclude ? !state : state} onClick={() => handleCheck()}>
        {name}
      </Button>
    </Container>
  );
}
