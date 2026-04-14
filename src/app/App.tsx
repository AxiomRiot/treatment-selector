import { useState } from 'react';
import Header from '../components/Header';
import Selectors from '../components/Selectors';
import Wrapper from '../components/Wrapper';
import { TREATMENTS } from '../config/config';
import TreatmentCard from '../components/TreatmentCard';

const STATUS_CONFIG = {
  approved: { label: 'FDA approved', bg: '#EAF3DE', color: '#27500A', dot: '#639922' },
  trial: { label: 'Clinical trial', bg: '#FAEEDA', color: '#633806', dot: '#BA7517' },
  'off-label': { label: 'Off-label', bg: '#F1EFE8', color: '#444441', dot: '#888780' },
};

export default function App() {
  const [selectedMutation, setSelectedMutation] = useState('');
  const [selectedOrgan, setSelectedOrgan] = useState('');

  const key = selectedMutation && selectedOrgan ? `${selectedMutation}|${selectedOrgan}` : '';
  const treatments = key ? TREATMENTS[key] ?? null : null;
  const hasNoData = key && treatments === null;

  function toggleMutation(m: string) {
    setSelectedMutation(prev => prev === m ? '' : m);
  }

  function toggleOrgan(o: string) {
    setSelectedOrgan(prev => prev === o ? '' : o);
  }

  return (
    <Wrapper>
      <Header />
      <Selectors
        selectedMutation={selectedMutation}
        selectedOrgan={selectedOrgan}
        handleMutationSelect={toggleMutation}
        handleOrganSelect={toggleOrgan}
      />
      <div>
        {!selectedMutation && !selectedOrgan && (
          <div style={{ textAlign: "center", padding: "48px 24px", color: "#b4b2a9", fontSize: 14 }}>
            Select a mutation and organ site above to begin
          </div>
        )}

        {(selectedMutation || selectedOrgan) && !key && (
          <div style={{ textAlign: "center", padding: "48px 24px", color: "#b4b2a9", fontSize: 14 }}>
            {!selectedMutation ? "Now select a mutation" : "Now select an organ site"}
          </div>
        )}

        {key && treatments && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>
                  {selectedMutation}
                </span>
                <span style={{ fontSize: 18, color: "#b4b2a9", margin: "0 8px" }}>·</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>
                  {selectedOrgan}
                </span>
                <span style={{ fontSize: 13, color: "#888780", marginLeft: 12 }}>
                  {treatments.length} treatment{treatments.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#b4b2a9", alignItems: "center", flexWrap: "wrap" }}>
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <span key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot }} />
                    {cfg.label}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {treatments.map((t, i:number) => (
                <TreatmentCard 
                  key={t.name}
                  name={t.name}
                  status={t.status}
                  drugClass={t.drugClass}
                  note={t.note}
                  index={i} 
                />
              ))}
            </div>
          </div>
        )}

        {hasNoData && (
          <div style={{ background: "#fff", border: "1px solid #e8e6df", borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 15, color: "#4a4a5a", marginBottom: 6 }}>
              No curated data for <strong>{selectedMutation}</strong> in <strong>{selectedOrgan}</strong>
            </p>
            <p style={{ fontSize: 13, color: "#888780" }}>
              This combination may not have established targeted therapies, or data is not yet in the database.
            </p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
