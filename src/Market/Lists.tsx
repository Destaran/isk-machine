import styled from "styled-components";
import { List } from "./List";
import { PostUniverseNamesResponse } from "../hey-api";

const Container = styled.div`
  width: 80%;
  background-color: #2b2b2b;
`;

const Title = styled.h1`
  color: white;
`;

interface Props {
  regionId: number;
  type: PostUniverseNamesResponse[number] | null;
}

export function Lists({ regionId, type }: Props) {
  return (
    <Container>
      {type && <Title>{type.name}</Title>}
      <List regionId={regionId} typeId={type?.id} />
      <List regionId={regionId} typeId={type?.id} isBuy />
    </Container>
  );
}
