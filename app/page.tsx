"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AIPanel from '@/components/AIPanel';

export default function HomePage() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenAI={() => setAiOpen(true)} />
      <main className="flex-1 grid place-items-center">
        <div className="container-safe w-full py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-subtle text-sm">
              Hoopra Search ? Sade, h?zl?, ak?ll?
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">Hoopra Search</h1>
            <p className="mt-2 text-subtle">Aramalar Google i?inde yap?l?r; Hoopra AI ile g??lendirilir.</p>
          </div>
          <SearchBar autofocus />

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {shortcuts.map((s) => (
              <a key={s.label} href={s.href} target="_blank" className="card p-4 hover:bg-white/5 transition">
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-subtle truncate">{s.href.replace('https://', '')}</div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} query={''} />
    </div>
  );
}

const shortcuts = [
  { label: 'Google', href: 'https://www.google.com' },
  { label: 'YouTube', href: 'https://www.youtube.com' },
  { label: 'Wikipedia', href: 'https://tr.wikipedia.org' },
  { label: 'Bing', href: 'https://www.bing.com' },
];
