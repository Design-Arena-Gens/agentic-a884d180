"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ autofocus = false }: { autofocus?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-3 border border-muted/80">
        <MagnifyingGlassIcon className="h-5 w-5 text-subtle" />
        <input
          autoFocus={autofocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Aray?n... (Google i?inde arat?r)"
          className="flex-1 bg-transparent outline-none text-base"
        />
        <button type="submit" className="button-base">Ara</button>
      </div>
    </form>
  );
}
