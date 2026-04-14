import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const MUTATIONS = ["EGFR", "KRAS G12C", "BRAF V600E", "ALK", "HER2", "BRCA1/2", "PIK3CA", "MET"];

const ORGANS = ["Lung", "Breast", "Colon", "Pancreas", "Melanoma", "Ovary", "Liver", "Prostate"];

const TREATMENTS = {
  "EGFR|Lung": [
    { name: "Osimertinib", drugClass: "EGFR TKI (3rd gen)", status: "approved", note: "1st-line preferred; CNS penetration" },
    { name: "Erlotinib", drugClass: "EGFR TKI (1st gen)", status: "approved", note: "Alternative for exon 19 / L858R" },
    { name: "Amivantamab + lazertinib", drugClass: "Bispecific + TKI combo", status: "trial", note: "Phase III — MARIPOSA trial" },
  ],
  "KRAS G12C|Lung": [
    { name: "Sotorasib", drugClass: "KRAS G12C inhibitor", status: "approved", note: "2nd-line after platinum-based chemo" },
    { name: "Adagrasib", drugClass: "KRAS G12C inhibitor", status: "approved", note: "CNS activity; 2nd-line" },
    { name: "Adagrasib + cetuximab", drugClass: "KRAS inhibitor + EGFR mAb", status: "trial", note: "Phase II combo" },
  ],
  "KRAS G12C|Colon": [
    { name: "Adagrasib + cetuximab", drugClass: "KRAS inhibitor + EGFR mAb", status: "approved", note: "FDA approved 2024" },
    { name: "Sotorasib + panitumumab", drugClass: "KRAS inhibitor + EGFR mAb", status: "approved", note: "2nd-line colorectal" },
  ],
  "BRAF V600E|Melanoma": [
    { name: "Dabrafenib + trametinib", drugClass: "BRAF + MEK inhibitors", status: "approved", note: "Standard doublet; mPFS ~11 mo" },
    { name: "Vemurafenib + cobimetinib", drugClass: "BRAF + MEK inhibitors", status: "approved", note: "Alternative doublet" },
    { name: "Encorafenib + binimetinib", drugClass: "BRAF + MEK inhibitors", status: "approved", note: "Favorable tolerability profile" },
  ],
  "BRAF V600E|Colon": [
    { name: "Encorafenib + cetuximab", drugClass: "BRAF inhibitor + EGFR mAb", status: "approved", note: "2nd-line; BEACON CRC trial" },
    { name: "Encorafenib + cetuximab + binimetinib", drugClass: "Triplet combo", status: "off-label", note: "Exploratory triplet from BEACON" },
  ],
  "HER2|Breast": [
    { name: "Trastuzumab + pertuzumab + docetaxel", drugClass: "HER2 mAbs + taxane", status: "approved", note: "1st-line metastatic standard of care" },
    { name: "Ado-trastuzumab emtansine (T-DM1)", drugClass: "Antibody-drug conjugate", status: "approved", note: "2nd-line post-pertuzumab" },
    { name: "Trastuzumab deruxtecan", drugClass: "ADC (HER2-directed)", status: "approved", note: "3rd-line; high response rate" },
  ],
  "BRCA1/2|Ovary": [
    { name: "Olaparib", drugClass: "PARP inhibitor", status: "approved", note: "Maintenance after platinum; 1st-line" },
    { name: "Niraparib", drugClass: "PARP inhibitor", status: "approved", note: "Maintenance; no companion Dx required" },
    { name: "Rucaparib", drugClass: "PARP inhibitor", status: "approved", note: "2nd-line treatment (not maintenance)" },
  ],
  "BRCA1/2|Breast": [
    { name: "Olaparib", drugClass: "PARP inhibitor", status: "approved", note: "gBRCA1/2 HER2-negative metastatic" },
    { name: "Talazoparib", drugClass: "PARP inhibitor", status: "approved", note: "gBRCA1/2 HER2-negative" },
  ],
  "ALK|Lung": [
    { name: "Alectinib", drugClass: "ALK TKI (2nd gen)", status: "approved", note: "1st-line preferred; CNS activity" },
    { name: "Brigatinib", drugClass: "ALK TKI (2nd gen)", status: "approved", note: "1st-line alternative" },
    { name: "Lorlatinib", drugClass: "ALK TKI (3rd gen)", status: "approved", note: "Post 2nd-gen progression; CNS" },
  ],
  "PIK3CA|Breast": [
    { name: "Alpelisib + fulvestrant", drugClass: "PI3K inhibitor + endocrine", status: "approved", note: "HR+/HER2− post-CDK4/6; SOLAR-1" },
    { name: "Inavolisib + palbociclib + fulvestrant", drugClass: "PI3Ki + CDK4/6i combo", status: "approved", note: "1st-line PIK3CA-mutated HR+" },
  ],
  "MET|Lung": [
    { name: "Tepotinib", drugClass: "MET TKI", status: "approved", note: "MET exon 14 skipping mutation" },
    { name: "Capmatinib", drugClass: "MET TKI", status: "approved", note: "MET exon 14 skipping; CNS active" },
    { name: "Crizotinib", drugClass: "MET/ALK/ROS1 TKI", status: "off-label", note: "Historical off-label MET use" },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  approved: { label: "FDA approved", bg: "#EAF3DE", color: "#27500A", dot: "#639922" },
  trial: { label: "Clinical trial", bg: "#FAEEDA", color: "#633806", dot: "#BA7517" },
  "off-label": { label: "Off-label", bg: "#F1EFE8", color: "#444441", dot: "#888780" },
};

function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["off-label"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 500, padding: "3px 9px",
      borderRadius: 999, background: cfg.bg, color: cfg.color,
      whiteSpace: "nowrap", flexShrink: 0,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

function TreatmentCard({ treatment, index }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8e6df",
      borderRadius: 12,
      padding: "16px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      animation: `fadeUp 0.3s ease both`,
      animationDelay: `${index * 60}ms`,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3, margin: 0 }}>
          {treatment.name}
        </p>
        <StatusPill status={treatment.status} />
      </div>
      <p style={{ fontSize: 12, color: "#6b7a8d", margin: 0, fontFamily: "monospace", letterSpacing: "0.02em" }}>
        {treatment.drugClass}
      </p>
      <p style={{ fontSize: 13, color: "#888780", margin: 0, paddingTop: 8, borderTop: "1px solid #f0ede6", lineHeight: 1.5 }}>
        {treatment.note}
      </p>
    </div>
  );
}

function SelectionChip({ label, isSelected, onClick, colorScheme }) {
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function TreatmentSelector() {
  const [selectedMutation, setSelectedMutation] = useState(null);
  const [selectedOrgan, setSelectedOrgan] = useState(null);

  const key = selectedMutation && selectedOrgan ? `${selectedMutation}|${selectedOrgan}` : null;
  const treatments = key ? TREATMENTS[key] ?? null : null;
  const hasNoData = key && treatments === null;

  const toggleMutation = (m) => setSelectedMutation(prev => prev === m ? null : m);
  const toggleOrgan = (o) => setSelectedOrgan(prev => prev === o ? null : o);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f8f6f1", minHeight: "100vh", padding: "40px 32px" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        button:hover { opacity: 0.85; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#888780", textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>
          Precision oncology
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", margin: 0, lineHeight: 1.2 }}>
          Treatment selector
        </h1>
        <p style={{ fontSize: 14, color: "#888780", marginTop: 8 }}>
          Select a mutation and organ site to surface matched targeted therapies.
        </p>
      </div>

      {/* Selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {/* Mutation */}
        <div style={{ background: "#fff", border: "1px solid #e8e6df", borderRadius: 16, padding: "20px 22px" }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", color: "#888780", textTransform: "uppercase", marginBottom: 14, fontFamily: "monospace" }}>
            Mutation
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {MUTATIONS.map(m => (
              <SelectionChip
                key={m}
                label={m}
                isSelected={selectedMutation === m}
                onClick={() => toggleMutation(m)}
                colorScheme="mutation"
              />
            ))}
          </div>
        </div>

        {/* Organ */}
        <div style={{ background: "#fff", border: "1px solid #e8e6df", borderRadius: 16, padding: "20px 22px" }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", color: "#888780", textTransform: "uppercase", marginBottom: 14, fontFamily: "monospace" }}>
            Organ / tissue
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {ORGANS.map(o => (
              <SelectionChip
                key={o}
                label={o}
                isSelected={selectedOrgan === o}
                onClick={() => toggleOrgan(o)}
                colorScheme="organ"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
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
          <div style={{ animation: "fadeUp 0.25s ease" }}>
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
              {treatments.map((t, i) => (
                <TreatmentCard key={t.name} treatment={t} index={i} />
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
    </div>
  );
}
