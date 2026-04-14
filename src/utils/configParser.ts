import type { MutationWrapperType } from '../types/dataTypes';
import fs from 'node:fs';

const CONFIG = '../data/data.csv';

export function parseConfigFile(): MutationWrapperType {
  const content = fs.readFileSync(CONFIG, 'utf-8');
  const lines = content.split('\n');

  const mutations = [];
  const organs = [];

  lines.map((line) => {
    const values = line.split(',');
    
  });
}
