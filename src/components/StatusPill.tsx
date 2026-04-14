import styled from 'styled-components';

interface StatusPillProps {
  status: 'approved' | 'trial' | 'off-label'
}

const STATUS_CONFIG = {
  approved: { label: 'FDA approved', bg: '#EAF3DE', color: '#27500A', dot: '#639922' },
  trial: { label: 'Clinical trial', bg: '#FAEEDA', color: '#633806', dot: '#BA7517' },
  'off-label': { label: 'Off-label', bg: '#F1EFE8', color: '#444441', dot: '#888780' },
};

const WrapperSpan = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 999px;
  white-space: nowrap;
  flex-shrink: 0;

  background-color: ${props => props.color || 'white'};
`;

const StyledSpan = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  color: #888780;

  background: ${props => props.color || 'white'};

  flex-shrink: 0;
`;

const Label = styled.div`
  color: #888780;
  margin: 0;
`;

export default function StatusPill({ status }: StatusPillProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["off-label"];
  
  return(
    <WrapperSpan color={cfg.bg}>
      <StyledSpan color={cfg.dot} />
      <Label>{cfg.label}</Label>
    </WrapperSpan>
  );
}
