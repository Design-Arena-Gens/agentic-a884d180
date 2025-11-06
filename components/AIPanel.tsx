"use client";

import { XMarkIcon, SparklesIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

export default function AIPanel({ open, onClose, query }: { open: boolean; onClose: () => void; query: string }) {
  const suggestions = useMemo(() => buildSmartSuggestions(query), [query]);

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-[420px] transform transition-transform duration-300 z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full card rounded-none sm:rounded-l-2xl border-l bg-surface/95 backdrop-blur">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-primary" />
            <div className="font-semibold">Hoopra AI</div>
          </div>
          <button onClick={onClose} className="button-base px-2 py-1"><XMarkIcon className="h-5 w-5" /></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
          <div className="text-subtle text-sm">Sorgu: <span className="text-text">{query || '?'}</span></div>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-text/90">Ak?ll? Yeniden Yaz?mlar</h3>
            <div className="grid gap-2">
              {suggestions.rewrites.map((s, i) => (
                <button key={i} onClick={() => window.open(`/search?q=${encodeURIComponent(s)}`, '_self')} className="button-base justify-start">
                  <SparklesIcon className="h-4 w-4 mr-2 text-primary" /> {s}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-text/90">H?zl? Filtreler</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.filters.map((f, i) => (
                <a key={i} href={`/search?q=${encodeURIComponent(f.query)}`} className="badge">{f.label}</a>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-text/90">D?? Kaynaklar</h3>
            <div className="grid gap-2">
              {suggestions.links.map((l, i) => (
                <a key={i} href={l.href} target="_blank" className="button-base justify-between">
                  <span>{l.label}</span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function buildSmartSuggestions(query: string) {
  const q = (query || '').trim();
  const safe = encodeURIComponent(q);
  const base = `https://www.google.com/search?q=${safe}`;

  const rewrites = Array.from(new Set([
    q,
    q && `en ${q}`,
    q && `${q} nedir?`
  ].filter(Boolean) as string[]));

  const filters = [
    { label: 'PDF', query: `${q} filetype:pdf` },
    { label: 'Resimler', query: `${q} images` },
    { label: 'Videolar', query: `${q} videos` },
    { label: 'Site:TR', query: `${q} site:.tr` },
    { label: 'Ba?l?kta', query: `intitle:${q}` },
  ];

  const links = [
    { label: 'Google', href: base },
    { label: 'G?rseller', href: `https://www.google.com/search?tbm=isch&q=${safe}` },
    { label: 'Haberler', href: `https://www.google.com/search?tbm=nws&q=${safe}` },
    { label: 'YouTube', href: `https://www.youtube.com/results?search_query=${safe}` },
    { label: 'Bing', href: `https://www.bing.com/search?q=${safe}` },
    { label: 'DuckDuckGo', href: `https://duckduckgo.com/?q=${safe}` },
  ];

  return { rewrites, filters, links };
}
