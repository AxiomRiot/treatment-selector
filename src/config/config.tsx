export const MUTATIONS = [
  'EGFR',
  'KRAS G12C',
  'BRAF V600E',
  'ALK',
  'HER2',
  'BRCA1/2',
  'PIK3CA',
  'MET',
];

export const ORGANS = [
  'Lung',
  'Breast',
  'Colon',
  'Pancreas',
  'Melanoma',
  'Ovary',
  'Liver',
  'Prostate',
];

export const TREATMENTS = {
  'EGFR|Lung': [
    { name: 'Osimertinib', drugClass: 'EGFR TKI (3rd gen)', status: 'approved', note: '1st-line preferred; CNS penetration' },
    { name: 'Erlotinib', drugClass: 'EGFR TKI (1st gen)', status: 'approved', note: 'Alternative for exon 19 / L858R' },
    { name: 'Amivantamab + lazertinib', drugClass: 'Bispecific + TKI combo', status: 'trial', note: 'Phase III — MARIPOSA trial' },
  ],
  'KRAS G12C|Lung': [
    { name: 'Sotorasib', drugClass: 'KRAS G12C inhibitor', status: 'approved', note: '2nd-line after platinum-based chemo' },
    { name: 'Adagrasib', drugClass: 'KRAS G12C inhibitor', status: 'approved', note: 'CNS activity; 2nd-line' },
    { name: 'Adagrasib + cetuximab', drugClass: 'KRAS inhibitor + EGFR mAb', status: 'trial', note: 'Phase II combo' },
  ],
  'KRAS G12C|Colon': [
    { name: 'Adagrasib + cetuximab', drugClass: 'KRAS inhibitor + EGFR mAb', status: 'approved', note: 'FDA approved 2024' },
    { name: 'Sotorasib + panitumumab', drugClass: 'KRAS inhibitor + EGFR mAb', status: 'approved', note: '2nd-line colorectal' },
  ],
  'BRAF V600E|Melanoma': [
    { name: 'Dabrafenib + trametinib', drugClass: 'BRAF + MEK inhibitors', status: 'approved', note: 'Standard doublet; mPFS ~11 mo' },
    { name: 'Vemurafenib + cobimetinib', drugClass: 'BRAF + MEK inhibitors', status: 'approved', note: 'Alternative doublet' },
    { name: 'Encorafenib + binimetinib', drugClass: 'BRAF + MEK inhibitors', status: 'approved', note: 'Favorable tolerability profile' },
  ],
  'BRAF V600E|Colon': [
    { name: 'Encorafenib + cetuximab', drugClass: 'BRAF inhibitor + EGFR mAb', status: 'approved', note: '2nd-line; BEACON CRC trial' },
    { name: 'Encorafenib + cetuximab + binimetinib', drugClass: 'Triplet combo', status: 'off-label', note: 'Exploratory triplet from BEACON' },
  ],
  'HER2|Breast': [
    { name: 'Trastuzumab + pertuzumab + docetaxel', drugClass: 'HER2 mAbs + taxane', status: 'approved', note: '1st-line metastatic standard of care' },
    { name: 'Ado-trastuzumab emtansine (T-DM1)', drugClass: 'Antibody-drug conjugate', status: 'approved', note: '2nd-line post-pertuzumab' },
    { name: 'Trastuzumab deruxtecan', drugClass: 'ADC (HER2-directed)', status: 'approved', note: '3rd-line; high response rate' },
  ],
  'BRCA1/2|Ovary': [
    { name: 'Olaparib', drugClass: 'PARP inhibitor', status: 'approved', note: 'Maintenance after platinum; 1st-line' },
    { name: 'Niraparib', drugClass: 'PARP inhibitor', status: 'approved', note: 'Maintenance; no companion Dx required' },
    { name: 'Rucaparib', drugClass: 'PARP inhibitor', status: 'approved', note: '2nd-line treatment (not maintenance)' },
  ],
  'BRCA1/2|Breast': [
    { name: 'Olaparib', drugClass: 'PARP inhibitor', status: 'approved', note: 'gBRCA1/2 HER2-negative metastatic' },
    { name: 'Talazoparib', drugClass: 'PARP inhibitor', status: 'approved', note: 'gBRCA1/2 HER2-negative' },
  ],
  'ALK|Lung': [
    { name: 'Alectinib', drugClass: 'ALK TKI (2nd gen)', status: 'approved', note: '1st-line preferred; CNS activity' },
    { name: 'Brigatinib', drugClass: 'ALK TKI (2nd gen)', status: 'approved', note: '1st-line alternative' },
    { name: 'Lorlatinib', drugClass: 'ALK TKI (3rd gen)', status: 'approved', note: 'Post 2nd-gen progression; CNS' },
  ],
  'PIK3CA|Breast': [
    { name: 'Alpelisib + fulvestrant', drugClass: 'PI3K inhibitor + endocrine', status: 'approved', note: 'HR+/HER2− post-CDK4/6; SOLAR-1' },
    { name: 'Inavolisib + palbociclib + fulvestrant', drugClass: 'PI3Ki + CDK4/6i combo', status: 'approved', note: '1st-line PIK3CA-mutated HR+' },
  ],
  'MET|Lung': [
    { name: 'Tepotinib', drugClass: 'MET TKI', status: 'approved', note: 'MET exon 14 skipping mutation' },
    { name: 'Capmatinib', drugClass: 'MET TKI', status: 'approved', note: 'MET exon 14 skipping; CNS active' },
    { name: 'Crizotinib', drugClass: 'MET/ALK/ROS1 TKI', status: 'off-label', note: 'Historical off-label MET use' },
  ],
};
