import DestinationCard from './DestinationCard';
import { destinations, type Island } from '@/lib/destinations';
import Hero from './Hero';

// island type filter
type IslandFilter = Island | 'all';

export default function DestinationList({
  initialIsland = 'all',
}: {
  initialIsland?: IslandFilter;
}) {
  const shown =
    initialIsland === 'all'
      ? destinations
      : destinations.filter((d) => d.island === initialIsland);

  return (
    <>
      <Hero count={destinations.length} />

      <ul className="destination-grid" role="list">
        {shown.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </ul>
    </>
  );
}
