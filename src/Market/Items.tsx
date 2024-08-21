import styled from "styled-components";
import { useNames } from "../hooks/universe/useNames";
import { Item } from "./Item";
import { PostUniverseNamesResponse } from "../hey-api";

const Container = styled.div``;

interface Props {
  setTypeId: (type: PostUniverseNamesResponse[number]) => void;
  types: number[];
}

export function Items({ setTypeId, types }: Props) {
  const { data: names, isLoading } = useNames(types);

  if (isLoading || names === undefined) {
    return null;
  }

  const typesWithNames = names.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container>
      {typesWithNames.length > 0 &&
        typesWithNames.map((type) =>
          type.id ? (
            <Item key={type.id} setTypeId={setTypeId} type={type} />
          ) : null
        )}
    </Container>
  );
}
