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
export const LANDSCAPES: Record<
  Landscape,
  { label: string; singular: string }
> = {
  mountains: { label: 'Mountains', singular: 'Mountains' },
  fiord: { label: 'Fiords', singular: 'Fiord' },
  geothermal: { label: 'Geothermal', singular: 'Geothermal' },
  volcanic: { label: 'Volcanoes', singular: 'Volcanic' },
  coast: { label: 'Coast', singular: 'Coast' },
  city: { label: 'Cities', singular: 'City' },
  caves: { label: 'Caves', singular: 'Caves' },
};

export function getDestination(id: string) {
  return destinations.find((d) => d.id === id);
}

// able to search macrons
function normalise(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// return destinations that include search and island type
export function filterDestinations(
  search: string,
  island: Island | 'all',
  landscape: Landscape | 'all',
) {
  // remove any stray spaces
  const query = normalise(search.trim());

  return destinations.filter((d) => {
    if (island !== 'all' && d.island !== island) return false;

    if (landscape !== 'all' && d.landscape !== landscape) return false;

    // search all
    const text = normalise(
      [
        d.name,
        d.maoriName,
        d.region,
        d.island,
        d.tagline,
        ...d.highlights,
        ...d.activities,
      ]
        .filter(Boolean)
        .join(' '),
    );

    return text.includes(query);
  });
}
