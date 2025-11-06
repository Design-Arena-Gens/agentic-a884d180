"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AIPanel from '@/components/AIPanel';

export type WikiData = {
  title: string;
  extract: string;
  url?: string;
  thumbnail?: string;
} | null;

function engineLinks(query: string) {
  const q = encodeURIComponent(query);
  return [
    { label: 'Google', href: `https://www.google.com/search?q=${q}` },
    { label: 'G?rseller', href: `https://www.google.com/search?tbm=isch&q=${q}` },
    { label: 'Haberler', href: `https://www.google.com/search?tbm=nws&q=${q}` },
    { label: 'YouTube', href: `https://www.youtube.com/results?search_query=${q}` },
    { label: 'Bing', href: `https://www.bing.com/search?q=${q}` },
    { label: 'DuckDuckGo', href: `https://duckduckgo.com/?q=${q}` },
  ];
}

function Engines({ query }: { query: string }) {
  const links = engineLinks(query);
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" className="badge">{l.label}</a>
      ))}
    </div>
  );
}

function WikiCard({ wiki }: { wiki: WikiData }) {
  if (!wiki) return null;
  return (
    <a href={wiki.url} target="_blank" className="card p-4 flex gap-4 hover:bg-white/5 transition">
      {wiki.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={wiki.thumbnail} alt={wiki.title} className="h-16 w-16 rounded-lg object-cover" />
      )}
      <div>
        <div className="text-sm text-subtle mb-1">Wikipedia ?zeti</div>
        <div className="font-semibold mb-1">{wiki.title}</div>
        <p className="text-sm text-subtle line-clamp-3">{wiki.extract}</p>
      </div>
    </a>
  );
}

export default function SearchClientShell({ query, wiki }: { query: string; wiki: WikiData }) {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenAI={() => setAiOpen(true)} />
      <main className="container-safe flex-1 py-6 space-y-6">
        <SearchBar />

        {query && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-subtle">Sonu?lar Google i?inde a??l?r.</div>
            <Engines query={query} />
          </div>
        )}

        <div className="grid gap-4">
          <WikiCard wiki={wiki} />

          {query && (
            <a href={`https://www.google.com/search?q=${encodeURIComponent(query)}`} target="_blank" className="card p-6 hover:bg-white/5 transition">
              <div className="text-sm text-subtle mb-1">Google</div>
              <div className="font-semibold">?{query}? i?in Google?da Ara</div>
              <div className="text-xs text-subtle mt-1">Yeni sekmede a??l?r</div>
            </a>
          )}
        </div>
      </main>

      <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} query={query} />
    </div>
  );
}
