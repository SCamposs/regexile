import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FarmGuide } from "@/src/content/farms";
import styles from "./guide-search-results.module.css";

export function GuideSearchResults({ guides, onSelect }: { guides: FarmGuide[]; onSelect: () => void }) {
  if (!guides.length) return null;
  return (
    <section aria-label="Matching farm guides" className={styles.guides}>
      <h2>Farm guides</h2>
      {guides.map((guide) => (
        <Link key={guide.id} href={guide.path} onNavigate={onSelect}>
          <Image src={(guide.heroArtwork ?? guide.artwork).src} width={40} height={40} alt="" />
          <strong>{guide.title}</strong>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ))}
    </section>
  );
}
