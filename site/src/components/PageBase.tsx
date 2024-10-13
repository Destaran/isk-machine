import styled from 'styled-components';
import { ReactNode } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  box-sizing: border-box;
  margin: 10px;
`;

interface PageBaseProps {
  children?: ReactNode;
}

export function PageBase({ children }: PageBaseProps) {
  return <Container>{children}</Container>;
}
