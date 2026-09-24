import { notFound } from "next/navigation";

import { SearchWorkspace } from "@/src/components/search-workspace";
import { getRegexSection, regexSections } from "@/src/content/regex";

export function ReferencePage({ slug, query = "" }: { slug: string; query?: string }) {
  const selectedSection = getRegexSection(slug);
  if (!selectedSection) notFound();
  return <SearchWorkspace sections={regexSections} selectedSection={selectedSection} initialQuery={query} />;
}
