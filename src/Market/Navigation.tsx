import styled from "styled-components";
import { Browse } from "./Browse";
import { PostUniverseNamesResponse } from "../hey-api";

const Container = styled.div`
  min-width: 500px;
  width: auto;
  min-height: 100vh;
  margin-right: 15px;
  overflow: scroll;
  background-color: #4b4b4b;
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
