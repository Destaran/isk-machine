import styled from "styled-components";
import { useItemTypes } from "./useTypes";
import { ItemType } from "./ItemType";
import { ItemType as ItemTypeType } from "../types";

const Container = styled.div``;

interface Props {
  handleClick: (item: ItemTypeType) => void;
}

export function ItemTypes({ handleClick }: Props) {
  const ItemTypesQuery = useItemTypes();

  const { data: itemTypes, isLoading, isError } = ItemTypesQuery;

  if (isLoading) {
    return <Container>loading item types...</Container>;
  }

  if (isError || !itemTypes) {
    return <Container>couldn't load item types</Container>;
  }

  return (
    <Container>
      {itemTypes.map((itemTypeId) => {
        return (
          <ItemType
            handleClick={handleClick}
            id={itemTypeId}
            key={itemTypeId}
          />
        );
      })}
    </Container>
  );
}
