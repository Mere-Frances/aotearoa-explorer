import { destinations } from '@/lib/destinations';

export default function HomePage() {
  return (
    <ul>
      {destinations.map((d) => (
        <li key={d.id}>
          {d.name}, {d.region}
        </li>
      ))}
    </ul>
  );
}
