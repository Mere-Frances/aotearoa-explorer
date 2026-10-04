'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// nav links
const links = [
  { href: '/', label: 'All destinations' },
  { href: '/north-island', label: 'North Island' },
  { href: '/south-island', label: 'South Island' },
  { href: '/about', label: 'About' },
];

// nav
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close on esc
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-nav ${open ? 'is-open' : ''}`}>
      <div className="site-nav__inner">
        <Link
          className="site-nav__brand"
          href="/"
          onClick={() => setOpen(false)}
        >
          <Image src="/logos.png" alt="" width={40} height={30} />
          Aotearoa explorer
        </Link>

        {/* hamburger menu */}
        <button
          className="site-nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="site-nav__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Menu
        </button>

        <nav className="site-nav__menu" id="site-menu" aria-label="Main">
          <ul className="site-nav__list" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className="site-nav__link"
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
