import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-bottom: 36px;
`;

const Title = styled.p`
  font-size: 11;
  letter-spacing: 0.15em;
  color: #888780;
  text-transform: uppercase;
  margin: 6px;
  font-family: monospace;
`;

const Treatment = styled.h1`
  font-size: 28;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 14;
  color: #888780;
  margin-top: 8px;
`;

export default function Header() {
  return (
    <StyledDiv>
      <Title>Percision Oncology</Title>
      <Treatment>Treatment Selector</Treatment>
      <Description>Select a mutation and organ site to matched targeted therapies.</Description>
    </StyledDiv>
  );
}
