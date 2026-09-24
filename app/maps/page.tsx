import type { Metadata } from "next";

import { ReferencePage } from "@/src/components/reference-page";

export const metadata: Metadata = { title: "Map Regexes" };

export default async function MapsPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  return <ReferencePage slug="maps" query={query} />;
}
