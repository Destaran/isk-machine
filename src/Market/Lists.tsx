import styled from "styled-components";
import { List } from "./List";
import { Title } from "./Title";
import { PostUniverseNamesResponse } from "../hey-api";

const Container = styled.div`
  width: 80%;
`;

interface Props {
  regionId: number;
  type: PostUniverseNamesResponse[number] | null;
}

export function Lists({ regionId, type }: Props) {
  return (
    <Container>
      {type && <Title name={type.name} />}
      <List regionId={regionId} typeId={type?.id} />
      <List regionId={regionId} typeId={type?.id} isBuy />
    </Container>
  );
}
