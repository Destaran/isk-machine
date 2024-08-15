import styled from "styled-components";
import { Lists } from "./Lists";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { useQueryClient } from "@tanstack/react-query";

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

export function Market() {
  const queryClient = useQueryClient();

  const [regionId, setRegionId] = useState(10000002);
  const [typeId, setTypeId] = useState<null | number>(null);

  function handleTypeId(event: React.MouseEvent<HTMLDivElement>) {
    queryClient.removeQueries({ queryKey: ["market", regionId] });
    setTypeId(Number(event.currentTarget.id));
  }

  return (
    <Container>
      <Navigation setTypeId={handleTypeId} />
      <Lists regionId={regionId} typeId={typeId} />
    </Container>
  );
}
