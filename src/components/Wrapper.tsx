import type { ReactNode } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  children: ReactNode;
}

const StyledDiv = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  background: #f8f6f1;
  min-height: 100vh;
  padding: 40px 32px;
`;

export default function Wrapper({ children }: WrapperProps) {
  return (
    <StyledDiv>
      {children}
    </StyledDiv>
  );
};
