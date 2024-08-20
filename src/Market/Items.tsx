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
  const typesWithNamesQuery = useNames(types);
  const { data: response, isLoading } = typesWithNamesQuery;

  if (isLoading || response === undefined || response.data === undefined) {
    return null;
  }

  const typesWithNames = response.data.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

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
