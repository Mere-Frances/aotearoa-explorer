import type { Metadata } from 'next';
import DestinationList from '@/components/DestinationList';

export const metadata: Metadata = { title: 'North Island' };

export default function NorthIslandPage() {
  return <DestinationList initialIsland="North Island" />;
}
