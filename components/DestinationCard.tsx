import Link from 'next/link';
import type { Destination } from '@/lib/destinations';

type Props = {
  destination: Destination;
  headingLevel?: 'h2' | 'h3';
};
