import data from '@/data/destinations.json';

export type Landscape =
  | 'mountains'
  | 'fiord'
  | 'geothermal'
  | 'volcanic'
  | 'coast'
  | 'city'
  | 'caves';

export type Island = 'North Island' | 'South Island';

export type Destination = {
  id: string;
  name: string;
  maoriName: string | null;
  island: Island;
  region: string;
  landscape: Landscape;
  tagline: string;
  description: string;
  highlights: string[];
  activities: string[];
  bestTime: string;
  image: string;
  photographer: string;
  photoUrl: string;
};

export const destinations = data as Destination[];

// each landscape type...
