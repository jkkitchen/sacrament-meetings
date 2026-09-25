"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter(); //Used push rather than replace because replace doesn't update correctly when back button is pushed

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // always reset to page 1 on a new search
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      key={searchParams.get("query") ?? ""} //Created to update search bar when back button is pushed.
      type="search"
      placeholder="Search by speaker, leader, or meeting type..."
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      aria-label="Search meetings"
      className="w-full rounded-lg border border-grove-green bg-white px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-grove-green"
    />
  );
}
