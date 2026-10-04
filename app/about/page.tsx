import type { Metadata } from 'next';
import Link from 'next/link';
import { destinations } from '@/lib/destinations';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <article className="about">
      <h1>About this site</h1>

      <p className="about__lead">
        Aotearoa explorer is a small guide to {destinations.length} of New
        Zealand&apos;s most popular places to visit. Browse the well-known
        locations across the North and South Islands, from beaches and mountains
        to lakes and forests, and find out a little about each one. Pick a
        destination, check out the details, and get some inspiration for your
        next trip around Aotearoa.
      </p>

      <h2>How it&apos;s built</h2>
      <p>
        The site is built with Next.js, React, TypeScript and SCSS. All the
        destination information comes from <code>data/destinations.json</code>.
        This is sample information.
      </p>
      <p>
        To access the Github, click{' '}
        <a
          href="https://github.com/Mere-Frances/aotearoa-explorer"
          target="_blank"
        >
          here.
        </a>
      </p>

      <p className="about__action">
        <Link className="button" href="/">
          Browse destinations
        </Link>
      </p>
    </article>
  );
}
