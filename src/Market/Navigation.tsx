import styled from "styled-components";
import { Browse } from "./Browse";

const Container = styled.div``;

interface Props {
  regionId: number;
}

export function Navigation({ regionId }: Props) {
  console.log(regionId);

  return (
    <Container>
      <Browse />
    </Container>
  );
}
