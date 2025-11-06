"use client";

import { useState } from 'react';
import { MagnifyingGlassIcon, PuzzlePieceIcon, BoltIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Header({ onOpenAI }: { onOpenAI?: () => void }) {
  const [url, setUrl] = useState('');

  function normalizeUrl(raw: string) {
    try {
      if (/^https?:\/\//i.test(raw)) return raw;
      if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw)) return `https://${raw}`;
      return `https://www.google.com/search?q=${encodeURIComponent(raw)}`;
    } catch {
      return `https://www.google.com/search?q=${encodeURIComponent(raw)}`;
    }
  }

  function go(e?: React.FormEvent) {
    e?.preventDefault();
    if (!url.trim()) return;
    window.open(normalizeUrl(url.trim()), '_self');
  }

  const extensions = [
    { key: 'ai', title: 'AI', icon: BoltIcon, onClick: onOpenAI },
    { key: 'apps', title: 'Eklentiler', icon: PuzzlePieceIcon },
    { key: 'grid', title: 'Uygulamalar', icon: Squares2X2Icon },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-surface/80 border-b border-white/5">
      <div className="container-safe flex items-center gap-3 py-3">
        <div className="flex items-center gap-2 select-none">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/90 to-secondary/90 grid place-items-center text-background font-black">H</div>
          <div className="font-semibold tracking-wide">Hoopra Search</div>
        </div>
        <form onSubmit={go} className="flex-1">
          <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2 border border-muted/80">
            <MagnifyingGlassIcon className="h-5 w-5 text-subtle" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={clsx('w-full bg-transparent outline-none text-sm')}
              placeholder="URL yaz?n veya aray?n"
            />
            <button type="submit" className="button-base text-sm">Git</button>
          </div>
        </form>
        <div className="flex items-center gap-1">
          {extensions.map((ext) => (
            <button
              key={ext.key}
              onClick={ext.onClick}
              className="button-base px-2 py-2"
              aria-label={ext.title}
              title={ext.title}
            >
              <ext.icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
