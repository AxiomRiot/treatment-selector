export interface OrganType {
  name: string;
}

export const Mutations = [
  'EGFR',
  'HER2',
  'KRAS-G12C',
  'ALK',
  'ROS1',
  'RET',
  'MET',
  'PD-L1',
];

export type MutationType = typeof Mutations[number];

export interface TreatmentType {
  name: string;
  drugClass: string;
  note: string;
  status: 'approved' | 'off-label' | 'trial';
}

export interface TreatmentMapping {
  organId: string;
  mutations: {
    [key in MutationType]?: TreatmentType[];
  };
}