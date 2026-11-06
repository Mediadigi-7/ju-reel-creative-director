import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export interface CreativeDNA {
  id: string;
  timestamp: string;
  topic: string;
  coreIdea: string;
  angle: string;
  perspective: string;
  hookType: string;
  narrativeStructure: string;
  emotionalDriver: string;
  visualDevice: string;
  metaphor: string;
  ctaType: string;
  openingPattern: string;
  keyClaims: string[];
}

const memoryStore: CreativeDNA[] = [];

export function recordCreativeDNA(dna: Omit<CreativeDNA, 'id' | 'timestamp'>): CreativeDNA {
  const record: CreativeDNA = {
    ...dna,
    id: `dna_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString()
  };
  memoryStore.push(record);
  // Keep memory to last 100 entries to prevent memory leak
  if (memoryStore.length > 100) {
    memoryStore.shift();
  }
  return record;
}

export function getRecentCreativeMemory(): CreativeDNA[] {
  return [...memoryStore];
}

export function clearCreativeMemory(): void {
  memoryStore.length = 0;
}
