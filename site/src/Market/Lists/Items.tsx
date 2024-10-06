import styled from 'styled-components';
import { Item } from './Item';
import { useNames } from '../../hooks/useNames';

const Container = styled.div``;

interface Props {
  types: number[];
}

export function Items({ types }: Props) {
  const { data: names, isLoading } = useNames(types);

  if (isLoading || names === undefined) {
    return null;
  }

  const typesWithNames = names.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container>
      {typesWithNames.length > 0 &&
        typesWithNames.map((type) => (type.id ? <Item key={type.id} type={type} /> : null))}
    </Container>
  );
}
