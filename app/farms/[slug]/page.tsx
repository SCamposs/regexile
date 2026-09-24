import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FarmWorkspace } from "@/src/components/farm-workspace";
import { farmGuides, getFarmGuide } from "@/src/content/farms";

export function generateStaticParams() {
  return farmGuides.map((guide) => ({ slug: guide.slug }));
}

type FarmPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: FarmPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getFarmGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

export default async function FarmPage({ params }: FarmPageProps) {
  const { slug } = await params;
  const guide = getFarmGuide(slug);
  if (!guide) notFound();
  return <FarmWorkspace guide={guide} />;
}
