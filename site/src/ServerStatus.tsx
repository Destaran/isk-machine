import styled from 'styled-components';
import { useServerStatus } from './api/server-status/useServerStatus';
import { GrStatusGoodSmall } from 'react-icons/gr';

const Title = styled.p`
  margin: 0;
  margin-right: 5px;
  font-size: 10pt;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 8px;
`;

export function ServerStatus() {
  const status = useServerStatus();

  const { data, isFetched } = status;

  if (!isFetched || !data) {
    <div>
      <Wrapper>
        <Title>Tranquility Status</Title>
        <GrStatusGoodSmall color="red" />
      </Wrapper>
      <Text>Players online:</Text>
      <Text>Server Version:</Text>
      <Text>Start Time:</Text>
    </div>;
  } else {
    const color = data.players > 0 ? 'green' : 'red';
    const date = new Date(data.startTime).toLocaleString();
    const players = new Intl.NumberFormat('en-US').format(data.players);

    return (
      <div>
        <Wrapper>
          <Title>Tranquility</Title>
          <GrStatusGoodSmall color={color} />
        </Wrapper>
        <Text>Players online: {players}</Text>
        <Text>Server Version: {data.serverVersion}</Text>
        <Text>Start Time: {date}</Text>
      </div>
    );
  }
}
