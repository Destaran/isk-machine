import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './components/Button';

const Container = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: #2b2b2b;
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
  useLocation();

  return (
    <Container>
      <Wrapper>
        <SideWrapper>
          <Button destination="market" title="Market" />
          <Button destination="market" title="Character" />
        </SideWrapper>
      </Wrapper>
    </Container>
  );
}
