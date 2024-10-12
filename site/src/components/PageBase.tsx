import styled from 'styled-components';
import { ReactNode } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  background-color: ${({ theme }) => theme.colors.emGrey};
  box-sizing: border-box;
`;

interface PageBaseProps {
  children?: ReactNode;
}

export function PageBase({ children }: PageBaseProps) {
  return <Container>{children}</Container>;
}
