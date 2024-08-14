import styled from "styled-components";
import { Lists } from "./Lists";
import { useState } from "react";
import { Navigation } from "./Navigation";

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

export function Market() {
  const [regionId] = useState(10000002);

  return (
    <Container>
      <Navigation regionId={regionId} />
      <Lists />
    </Container>
  );
}
