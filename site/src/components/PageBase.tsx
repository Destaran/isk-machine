import styled from 'styled-components';
import { ReactNode } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  background-color: #2b2b2b;
  box-sizing: border-box;
  margin: auto;
`;

interface PageBaseProps {
  children?: ReactNode;
}

export function PageBase({ children }: PageBaseProps) {
  return <Container>{children}</Container>;
}
