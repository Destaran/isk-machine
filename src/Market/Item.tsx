import styled from "styled-components";
import { useType } from "../hooks/universe/useType";

const Container = styled.div`
  padding-left: 20px;
  &:hover {
    background-color: aliceblue;
  }
`;

interface Props {
  id: number;
  setTypeId: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Item({ id, setTypeId }: Props) {
  const { data: response, isLoading } = useType(id);
  const divId = id ? id.toString() : "";

  if (isLoading || response === undefined) {
    return null;
  }

  const item = response.data;

  return (
    <Container id={divId} onClick={(e) => setTypeId(e)}>
      {item?.name}
    </Container>
  );
}
