import Link from 'next/link';
import type { Destination } from '@/lib/destinations';
import Image from 'next/image';

type Props = {
  destination: Destination;
  headingLevel?: 'h2' | 'h3';
};

// card skeleton
export default function DestinationCard({
  destination: d,
  headingLevel: Heading = 'h2',
}: Props) {
  return (
    <li className="destination-card">
      <Link className="destination-card__link" href={`/destinations/${d.id}`}>
        <div className="destination-card__art">
          <Image
            src={d.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 576px) 50vw, 100vw"
          />
        </div>
        <Heading className="destination-card__name">{d.name}</Heading>
        {d.maoriName && (
          <p className="destination-card__maori" lang="mi">
            {d.maoriName}
          </p>
        )}
        <p className="destination-card__place">
          {d.region}, {d.island}
        </p>
        <p className="destination-card__tagline">{d.tagline}</p>
      </Link>
    </li>
  );
}
