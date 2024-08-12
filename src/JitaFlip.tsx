import styled from "styled-components";
import { ItemTypes } from "./ItemType/ItemTypes";
import { useState } from "react";
import { Orders } from "./Orders/Orders";
import { ItemType } from "./types";
import { useQueryClient } from "@tanstack/react-query";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
`;

const TypesContainer = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 80vh;
  overflow: scroll;
`;

const SearchBar = styled.input`
  width: 100%;
`;

export function JitaFlip() {
  const [item, setItem] = useState<ItemType | null>(null);
  const queryClient = useQueryClient();

  function handleItemClick(item: ItemType) {
    setItem(item);
    queryClient.invalidateQueries();
  }

  return (
    <Container>
      <h2>JitaFlip</h2>
      <Wrapper>
        <TypesContainer>
          <SearchBar type="text" />
          <ItemTypes handleClick={handleItemClick} />
        </TypesContainer>
        {item && <Orders item={item} />}
      </Wrapper>
    </Container>
  );
}
