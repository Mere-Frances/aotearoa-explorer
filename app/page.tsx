import { destinations } from '@/lib/destinations';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <>
      <Hero count={destinations.length} />
      {/* <ul>
        {destinations.map((d) => (
          <li key={d.id}>
            {d.name}, {d.region}
          </li>
        ))}
      </ul> */}
    </>
  );
}
