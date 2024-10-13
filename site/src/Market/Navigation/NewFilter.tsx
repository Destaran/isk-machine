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
  background-color: ${({ theme, $state }) =>
    $state ? theme.colors.emBlack : theme.colors.emDarkGrey};
  color: ${({ type, theme, $state }) => ($state ? theme.colors.filters[type] : 'white')};
  border-color: ${({ type, theme, $state }) => ($state ? theme.colors.filters[type] : 'white')};
  border-radius: 5px;
  padding: 3px;
  margin: 5px 0;
  min-width: 135px;
  font-family: Orbitron;

  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  name: string;
  type: FilterKey | TextFilterKey;
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
