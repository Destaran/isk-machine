import { useState } from "react";
import styled from "styled-components";
import { SearchResults } from "./SearchResults";
import { useMarketRegionTypes } from "../hooks/markets/useMarketRegionTypes";

const Container = styled.div``;

interface Props {
  regionId: number;
}

export function Search({ regionId }: Props) {
  const [search, setSearch] = useState("");
  const typesQuery = useMarketRegionTypes(regionId);

  const {
    data: types,
    isError: typesError,
    isLoading: typesLoading,
  } = typesQuery;

  if (typesLoading) {
    return null;
  }

  if (typesError || types !== null) {
    return null;
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <Container>
      <input onChange={(e) => handleSearch(e)} />
      {search && <SearchResults types={types} />}
    </Container>
  );
}
