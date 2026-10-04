export default function Hero({ count }: { count: number }) {
  return (
    <section className="hero hero--intro">
      <div className="hero__inner">
        <h1 className="hero__title">Where to next in Aotearoa?</h1>
        <p className="hero__intro">
          {/* update # based on destinations.length */}
          {count} places worth the trip, from glowworm caves to glacier valleys.
          Pick one to see what&apos;s there and when to go.
        </p>
      </div>
    </section>
  );
}
