'use client';

import { useState } from 'react';
import DestinationCard from './DestinationCard';
import Select from './Select';
import {
  LANDSCAPES,
  destinations,
  filterDestinations,
  type Island,
  type Landscape,
} from '@/lib/destinations';
import Hero from './Hero';

// island type filter
type IslandFilter = Island | 'all';
// landscape type filter
type LandscapeFilter = Landscape | 'all';

// quick filter buttons
const ISLANDS: IslandFilter[] = ['all', 'North Island', 'South Island'];

// filter landscapes
const LANDSCAPE_OPTIONS: { value: LandscapeFilter; label: string }[] = [
  { value: 'all', label: 'All landscapes' },
  ...(Object.entries(LANDSCAPES) as [Landscape, { label: string }][]).map(
    ([value, info]) => ({
      value,
      label: info.label,
    }),
  ),
];

// adress
const ISLAND_PATHS: Record<IslandFilter, string> = {
  all: '/',
  'North Island': '/north-island',
  'South Island': '/south-island',
};

export default function DestinationList({
  initialIsland = 'all',
}: {
  initialIsland?: IslandFilter;
}) {
  // memory states
  const [search, setSearch] = useState('');
  const [island, setIsland] = useState<IslandFilter>(initialIsland);
  const [landscape, setLandscape] = useState<LandscapeFilter>('all');

  // results
  const matches = filterDestinations(search, island, landscape);

  //   both clicked
  function changeIsland(value: IslandFilter) {
    setIsland(value);

    // no reload
    window.history.replaceState(null, '', ISLAND_PATHS[value]);
  }

  // clear filters
  function clearFilters() {
    setSearch('');
    changeIsland('all');
    setLandscape('all');
  }

  const shown =
    initialIsland === 'all'
      ? destinations
      : destinations.filter((d) => d.island === initialIsland);

  return (
    <>
      <Hero count={destinations.length} />

      {/* filters */}
      <section className="filters" aria-label="Filter destinations">
        {/* search bar */}
        <div className="filters__field">
          <label className="filters__label" htmlFor="search">
            Search
          </label>
          <input
            className="filters__input"
            id="search"
            type="search"
            autoComplete="off"
            placeholder="Try glowworms, Otago or skiing"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* filter islands */}
        <fieldset className="filters__field">
          <legend className="filters__label">Island</legend>
          <div className="segmented">
            {ISLANDS.map((value) => (
              <label className="segmented__option" key={value}>
                <input
                  type="radio"
                  name="island"
                  value={value}
                  checked={island === value}
                  onChange={() => changeIsland(value)}
                />
                <span>{value === 'all' ? 'Both' : value}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* landscape dropdown filter */}
        <div className="filters__field">
          <span className="filters__label" id="landscape-label">
            Landscape
          </span>
          <Select
            labelId="landscape-label"
            options={LANDSCAPE_OPTIONS}
            value={landscape}
            onChange={setLandscape}
          />
        </div>
      </section>

      {/* # of results */}
      <p className="results-count" aria-live="polite">
        {matches.length === destinations.length
          ? `Showing all ${destinations.length} destinations`
          : `Showing ${matches.length} of ${destinations.length} destinations`}
      </p>

      {/* filtered results */}
      {matches.length === 0 ? (
        // empty message and action
        <div className="empty">
          <p className="empty__text">
            No destinations match those filters. Try a different word, or clear
            the filters to see everything.
          </p>
          <button className="button" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        // produce cards
        <ul className="destination-grid" role="list">
          {matches.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </ul>
      )}
    </>
  );
}
