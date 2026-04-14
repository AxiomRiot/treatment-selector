import styled from 'styled-components';
import { MUTATIONS, ORGANS } from '../config/config';

interface SelectorProps {
  selectedMutation: string;
  selectedOrgan: string;
  handleMutationSelect: (m: string) => void;
  handleOrganSelect: (o: string) => void;
}

interface SelectionChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  colorScheme: 'mutation' | 'organ';
}

const SelectorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
`;

const SelectorDiv = styled.div`
  background: #fff;
  border: 1px solid #e8e6df;
  border-radius: 16px;
  padding: 20px 22px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const SelectorTitle = styled.p`
  font-size: 11;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: #888780;
  text-transform: uppercase;
  margin-bottom: 14px;
  font-family: monospace;
`;

const SelectorsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

function SelectionChip({ label, isSelected, onClick, colorScheme }: SelectionChipProps) {
  const schemes = {
    mutation: {
      selected: { background: "#1a1a2e", color: "#e8e6ff", border: "1px solid #534AB7" },
      default: { background: "#fafaf8", color: "#4a4a5a", border: "1px solid #d3d1c7" },
    },
    organ: {
      selected: { background: "#0a1f1a", color: "#9FE1CB", border: "1px solid #1D9E75" },
      default: { background: "#fafaf8", color: "#4a4a5a", border: "1px solid #d3d1c7" },
    },
  };

  const style = isSelected ? schemes[colorScheme].selected : schemes[colorScheme].default;
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 13,
        fontWeight: isSelected ? 500 : 400,
        cursor: "pointer",
        transition: "all 0.15s ease",
        whiteSpace: "nowrap",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

export default function Selectors({ selectedMutation, selectedOrgan, handleMutationSelect, handleOrganSelect }: SelectorProps) {
  return (
    <SelectorGrid>
      <SelectorDiv>
        <SelectorTitle>Mutation</SelectorTitle>
        <SelectorsDiv>
          {MUTATIONS.map(m => (
            <SelectionChip
              key={m}
              label={m}
              isSelected={selectedMutation === m}
              onClick={() => handleMutationSelect(m)}
              colorScheme="mutation"
            />
          ))}
        </SelectorsDiv>
      </SelectorDiv>
      <SelectorDiv>
        <SelectorTitle>Organs / Tissue</SelectorTitle>
        <SelectorsDiv>
          {ORGANS.map(o => (
            <SelectionChip
              key={o}
              label={o}
              isSelected={selectedOrgan === o}
              onClick={() => handleOrganSelect(o)}
              colorScheme="organ"
            />
          ))}
        </SelectorsDiv>
      </SelectorDiv>
    </SelectorGrid>
  );
};
