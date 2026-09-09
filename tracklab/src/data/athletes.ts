import type { Athlete } from '@/types/athlete'

export const athletes: Athlete[] = [
  {
    id: crypto.randomUUID(),
    name: 'Steven Peeters',
    country: 'BEL',
    personalBest: 9.82,
  },
  {
    id: crypto.randomUUID(),
    name: 'Pieter Janssens',
    country: 'NED',
    personalBest: 9.94,
  },
  {
    id: crypto.randomUUID(),
    name: 'Thomas Dupont',
    country: 'BEL',
    personalBest: 10.12,
  },
  {
    id: crypto.randomUUID(),
    name: 'Max Müller',
    country: 'GER',
    personalBest: 10.05,
  },
]
