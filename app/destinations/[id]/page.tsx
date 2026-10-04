import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DestinationCard from '@/components/DestinationCard';
import { LANDSCAPES, destinations, getDestination } from '@/lib/destinations';

type Props = { params: Promise<{ id: string }> };

// one page per destination in advance
export function generateStaticParams() {
  return destinations.map((d) => ({ id: d.id }));
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const d = getDestination(id);
  return { title: d?.name ?? 'Not found' };
}

// single page
export default async function DestinationPage({ params }: Props) {
  const { id } = await params;
  const d = getDestination(id);
  if (!d) notFound();

  return (
    <article className="detail">
      {/* back button */}
      <Link className="back-link" href="/">
        <svg
          viewBox="0 0 20 20"
          width="18"
          height="18"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M12.5 4 6.5 10l6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to destinations
      </Link>

      {/* main header */}
      <header className="detail__header">
        <div className="detail__media">
          <div className="detail__art">
            <Image
              src={d.image}
              alt={`${d.name}, ${d.region}`}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
          <p className="detail__credit">
            Photo by{' '}
            <a href={d.photoUrl} target="_blank" rel="noopener noreferrer">
              {d.photographer}
            </a>{' '}
            on{' '}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          </p>
        </div>

        {/* details */}
        <div className="detail__intro">
          <h1 className="detail__title">{d.name}</h1>
          {d.maoriName && (
            <p className="detail__maori" lang="mi">
              {d.maoriName}
            </p>
          )}
          <p className="detail__tagline">{d.tagline}</p>

          <dl className="facts">
            <dt>Island</dt>
            <dd>{d.island}</dd>
            <dt>Region</dt>
            <dd>{d.region}</dd>
            <dt>Landscape</dt>
            <dd>{LANDSCAPES[d.landscape].singular}</dd>
            <dt>Best time to visit</dt>
            <dd>{d.bestTime}</dd>
            <dt>Location</dt>
          </dl>
        </div>
      </header>

      <div className="detail__body">
        <section className="detail__section detail__section--about">
          <h2>About</h2>
          <p>{d.description}</p>
        </section>

        <section className="detail__section">
          <h2>Highlights</h2>
          <ul className="highlights">
            {d.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="detail__section">
          <h2>Things to do</h2>
          <ul className="tags" role="list">
            {d.activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
