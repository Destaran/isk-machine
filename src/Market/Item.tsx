import styled from "styled-components";
import { PostUniverseNamesResponse } from "../hey-api";

const Container = styled.div`
  margin-left: 20px;
  background-color: #2b2b2b;
  color: white;

  &:hover {
    background-color: grey;
  }
`;

interface Props {
  type: PostUniverseNamesResponse[number];
  setTypeId: (type: PostUniverseNamesResponse[number]) => void;
}

export function Item({ type, setTypeId }: Props) {
  const { id, name } = type;

  return (
    <Container id={id.toString()} onClick={() => setTypeId(type)}>
      - {name}
    </Container>
  );
}
