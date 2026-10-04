'use client';

import { useEffect, useId, useRef, useState } from 'react';

// one choice
type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  // name dropdown
  labelId: string;
  // options
  options: Option<T>[];
  // selected option
  value: T;
  // repick
  onChange: (value: T) => void;
};

export default function Select<T extends string>({
  labelId,
  options,
  value,
  onChange,
}: Props<T>) {
  // unique id
  const id = useId();

  const root = useRef<HTMLDivElement>(null);

  // check if list is open and if option is selected
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const [active, setActive] = useState(selectedIndex);

  // close when clicked outside
  useEffect(() => {
    if (!open) return;

    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  // open
  function openList() {
    setActive(selectedIndex);
    setOpen(true);
  }

  // selection
  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
  }

  return (
    <div ref={root} className={`select ${open ? 'is-open' : ''}`}>
      <div
        id={`${id}-button`}
        className="select__button"
        role="combobox"
        tabIndex={0}
        onClick={() => (open ? setOpen(false) : openList())}
      >
        <span>{options[selectedIndex]?.label}</span>
        <svg
          className="select__chevron"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="m5 8 5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <ul
        id={`${id}-list`}
        className="select__list"
        role="listbox"
        // aria-labelledby={labelId}
        onMouseDown={(e) => e.preventDefault()}
      >
        {options.map((option, i) => (
          <li
            key={option.value}
            id={`${id}-${i}`}
            className={`select__option ${open && i === active ? 'is-active' : ''}`}
            role="option"
            // aria-selected={i === selectedIndex}
            style={{ '--i': i } as React.CSSProperties}
            onMouseEnter={() => setActive(i)}
            onClick={() => choose(i)}
          >
            {option.label}
            {i === selectedIndex && (
              <svg
                className="select__check"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="m4.5 10.5 3.5 3.5 7.5-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
