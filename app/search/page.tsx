import SearchClientShell, { type WikiData } from '@/components/SearchClientShell';

async function getWikiSummary(query: string) {
  if (!query) return null;
  const endpoint = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.extract) return null;
    return {
      title: data.title as string,
      extract: data.extract as string,
      url: data.content_urls?.desktop?.page as string | undefined,
      thumbnail: (data.thumbnail?.source as string | undefined) || undefined,
    };
  } catch {
    return null;
  }
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || '').trim();
  const wiki = (await getWikiSummary(q)) as WikiData;

  return (
    <SearchClientShell query={q} wiki={wiki} />
  );
}
