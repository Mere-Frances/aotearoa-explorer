import './globals.scss';
import Nav from '@/components/Nav';

import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';

// font for maori macrons
const font = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage',
});

// page meta data
export const metadata: Metadata = {
  title: {
    default: 'Aotearoa Explorer',
    template: '%s | Aotearoa Explorer',
  },
  description:
    'Browse destinations around Aotearoa New Zealand and read about each one.',
};

// page frame
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NZ" className={font.variable}>
      <body>
        {/* keyboard shortcut */}
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {/* nav */}
        <Nav />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <p>
            Destination information is sample.
            <br />
            {/* stored in <code>data/destinations.json</code>. */}
            Photos from <a href="https://unsplash.com">Unsplash</a>.
          </p>
        </footer>
      </body>
    </html>
  );
}
