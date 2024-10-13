import styled from 'styled-components';
import { Button } from './components/Button';

const Container = styled.div`
  display: flex;
  align-items: start;
  border-radius: 5px;
  margin: 0 10px;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  padding: 2px 0 2px 0;
`;

export function NavBar() {
  return (
    <Container>
      <Button destination="/market" title="Market" />
      <Button destination="/jita-flipper" title="Jita Flipper" />
      <Button destination="/admin" title="Admin" />
    </Container>
  );
}
