import styled from "styled-components";
import { List } from "./List";
import { Title } from "./Title";

const Container = styled.div``;

interface Props {
  regionId: number;
  typeId: number | null;
}

export function Lists({ regionId, typeId }: Props) {
  return (
    <Container>
      {typeId && <Title typeId={typeId} />}
      <List regionId={regionId} typeId={typeId} />
      <List regionId={regionId} typeId={typeId} isBuy />
    </Container>
  );
}
