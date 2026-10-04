import DestinationCard from './DestinationCard';
import { destinations } from '@/lib/destinations';
import Hero from './Hero';

export default function DestinationList() {
  return (
    <>
      <Hero count={destinations.length} />

      <ul className="destination-grid" role="list">
        {destinations.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </ul>
    </>
  );
}
