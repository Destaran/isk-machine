import styled from "styled-components";
import { useItemType } from "./useType";
import { ItemType as ItemTypeType } from "../types";

const Container = styled.div``;

interface Props {
  id: number;
  handleClick: (item: ItemTypeType) => void;
}

export function ItemType({ id, handleClick }: Props) {
  const itemTypeQuery = useItemType(id);

  const { data: itemType, isLoading, isError } = itemTypeQuery;

  if (id === 0) {
    return null;
  }

  if (isLoading) {
    return <Container>loading item type...</Container>;
  }

  if (isError || !itemType) {
    console.log("itemType", id);

    return <Container>couldn't load item type:{id}</Container>;
  }

  if (!itemType.published) {
    return null;
  }

  return (
    <Container>
      <button onClick={() => handleClick(itemType)}>{itemType.name}</button>
    </Container>
  );
}
