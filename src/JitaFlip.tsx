import { useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

export function JitaFlip() {
  const handleFetchGameData = useCallback(() => {
    console.log("Fetching EVE Game Data");
  }, []);

  const handleFetchJita = useCallback(() => {
    console.log("Fetching Jita Data");
  }, []);

  const getItemsHandler = useCallback(() => {
    console.log("Getting Items");
  }, []);

  return (
    <Container>
      <h2>JitaFlip</h2>
      <button onClick={handleFetchGameData}>Fetch EVE game data</button>
      <button onClick={handleFetchJita}>Fetch Jita data</button>
      <p>info</p>
      <input type="text" placeholder="min profit %" defaultValue={10} />
      <button onClick={getItemsHandler}>Get Items</button>
    </Container>
  );
}
