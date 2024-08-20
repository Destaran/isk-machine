import styled from "styled-components";
import { Browse } from "./Browse";
import { PostUniverseNamesResponse } from "../hey-api";

const Container = styled.div`
  width: 500px;
  max-height: 100vh;
  border: 1px solid black;
  margin-right: 15px;
  overflow: scroll;
`;

interface Props {
  setTypeId: (type: PostUniverseNamesResponse[number]) => void;
}

export function Navigation({ setTypeId }: Props) {
  return (
    <Container>
      <Browse setTypeId={setTypeId} />
    </Container>
  );
}
