import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReferencePage } from "@/src/components/reference-page";
import { getRegexSection, tabletSections } from "@/src/content/regex";

export function generateStaticParams() {
  return tabletSections.map((section) => ({ slug: section.slug }));
}

type TabletPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: TabletPageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = getRegexSection(slug);
  if (!section || section.group !== "tablets") return {};
  return { title: section.title, description: section.description };
}

export default async function TabletPage({ params, searchParams }: TabletPageProps) {
  const [{ slug }, queryParams] = await Promise.all([params, searchParams]);
  const section = getRegexSection(slug);
  if (!section || section.group !== "tablets") notFound();
  const query = typeof queryParams.q === "string" ? queryParams.q : "";
  return <ReferencePage slug={slug} query={query} />;
}
