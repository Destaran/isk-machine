import styled from 'styled-components';
import { Button } from './components/Button';

const Container = styled.div`
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.black};
  background-color: #${({ theme }) => theme.colors.emDarkGrey};
  padding: 2px 0 2px 0;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
`;

const SideWrapper = styled.div`
  display: flex;
`;

export function NavBar() {
  return (
    <Container>
      <Wrapper>
        <SideWrapper>
          <Button destination="/market" title="Market" />
          <Button destination="/jita-flipper" title="Jita Flipper" />
          <Button destination="/admin" title="Admin" />
        </SideWrapper>
      </Wrapper>
    </Container>
  );
}
