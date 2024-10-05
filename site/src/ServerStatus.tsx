import styled from 'styled-components';
import { useServerStatus } from './api/server-status/useServerStatus';

const Title = styled.p`
  margin: 0;
  margin-bottom: 3px;
  font-size: 10pt;
`;

const Text = styled.p`
  margin: 0;
  font-size: 8pt;
`;

export function ServerStatus() {
  const status = useServerStatus();

  const { data, isFetched } = status;

  if (!isFetched || !data) {
    <div>
      <Title>Tranquility Status</Title>
      <Text>Players online:</Text>
      <Text>Server Version:</Text>
      <Text>Start Time:</Text>
    </div>;
  } else {
    const date = new Date(data.startTime);
    return (
      <div>
        <Title>Tranquility Status</Title>
        <Text>Players online: {data.players}</Text>
        <Text>Server Version: {data.serverVersion}</Text>
        <Text>Start Time: {date.toLocaleString()}</Text>
      </div>
    );
  }
}
