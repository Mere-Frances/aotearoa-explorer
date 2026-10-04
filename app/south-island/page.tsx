import type { Metadata } from 'next';
import DestinationList from '@/components/DestinationList';

export const metadata: Metadata = { title: 'South Island' };

export default function SouthIslandPage() {
  return <DestinationList initialIsland="South Island" />;
}
