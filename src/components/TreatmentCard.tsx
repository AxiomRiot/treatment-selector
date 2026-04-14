import styled, { keyframes } from 'styled-components';
import StatusPill from './StatusPill';

interface TreatmentCardProps {
  name: string;
  status: 'approved' | 'trial' | 'off-label'
  drugClass: string;
  note: string;
  index: number;
}

interface WrapperDivProps {
  delay?: string;
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const WrapperDiv = styled.div<WrapperDivProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  animation: ${fadeUp} 0.3s ease both;
  animation-delay: ${props => props.delay || '100ms'};
  
  background: #fff;
  border: 1px solid #e8e6df;
  border-radius: 12px;
  padding: 16px 18px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const TreatmentName = styled.p`
  font-size: 15;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
  margin: 0;
`;

const DrugClass = styled.p`
  font-size: 12;
  color: #6b7a8d;
  margin: 0px;
  font-family: monospace;
  letter-spacing: 0.02em;
`;

const TreatmentNote = styled.p`
  font-size: 13;
  color: #888780;
  margin: 0;
  padding-top: 8px;
  border-top: 1px solid #f0ede6;
  line-height: 1.5;
`;

export default function TreatmentCard({ name, status, drugClass, note, index }: TreatmentCardProps) {
  const delay = `${index * 60}ms`;

  return (
    <WrapperDiv delay={delay}>
      <Card>
        <TreatmentName>{name}</TreatmentName>
        <StatusPill status={status} />
      </Card>
      <DrugClass>{drugClass}</DrugClass>
      <TreatmentNote>{note}</TreatmentNote>
    </WrapperDiv>
  );
}