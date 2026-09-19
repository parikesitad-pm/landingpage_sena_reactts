export type MemoryCategory =
  | 'newborn'
  | 'family'
  | 'everyday'
  | 'hospital'
  | 'recovery'
  | 'milestone';

export type Memory = {
  id: string;
  image: string;
  alt: string;
  caption: string;
  category: MemoryCategory;
  date?: string;
  featured?: boolean;
};
