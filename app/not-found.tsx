import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="message">
      <h1>That page isn&apos;t here</h1>
      <p>
        The link may be mistyped, or the destination may have been removed from
        the data file.
      </p>
      <p>
        <Link href="/">See all destinations</Link>
      </p>
    </section>
  );
}
