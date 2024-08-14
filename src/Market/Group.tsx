import styled from "styled-components";
import { useMarketGroup } from "../hooks/markets/useMarketGroup";

const Container = styled.div``;

interface Props {
  groupId: number;
}

export function Group({ groupId }: Props) {
  const groupQuery = useMarketGroup(groupId);

  const {
    data: group,
    isError: groupError,
    isLoading: groupLoading,
  } = groupQuery;

  if (groupLoading) {
    return null;
  }

  if (groupError || group === null) {
    return null;
  }

  if ((group === null) | !group.published) {
    return null;
  }
  console.log(group);

  return (
    <Container>
      <p>{group.name}</p>
    </Container>
  );
}
