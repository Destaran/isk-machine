import styled from 'styled-components';

const Container = styled.div``;

const Text = styled.p`
  color: white;
`;

interface Props {
  timestamp: number;
}

export function LastUpdated({ timestamp }: Props) {
  const updateDate = new Date(timestamp);
  const nowDate = new Date();
  const diff = nowDate.getTime() - updateDate.getTime();
  const diffHours = Math.floor(diff / 1000 / 60 / 60);
  const diffMinutes = Math.floor((diff / 1000 / 60) % 60);
  const timePassed = diffHours > 0 ? `${diffHours} hours` : `${diffMinutes} minutes`;
  return (
    <Container>
      <Text>Last updated {timePassed} ago.</Text>
    </Container>
  );
}
