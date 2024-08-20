import styled from "styled-components";
import { Lists } from "./Lists";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { useQueryClient } from "@tanstack/react-query";
import { PostUniverseNamesResponse } from "../hey-api";

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

export function Market() {
  const queryClient = useQueryClient();

  const [regionId, setRegionId] = useState(10000002);
  const [type, setTypeId] = useState<null | PostUniverseNamesResponse[number]>(
    null
  );

  function handleTypeId(type: PostUniverseNamesResponse[number]) {
    queryClient.removeQueries({ queryKey: ["market", regionId, type.id] });
    setTypeId(type);
  }

  return (
    <Container>
      <Navigation setTypeId={handleTypeId} />
      <Lists regionId={regionId} type={type} />
    </Container>
  );
}
