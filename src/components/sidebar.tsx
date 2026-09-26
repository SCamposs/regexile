import Link from "next/link";
import Image from "next/image";
import { Swords } from "lucide-react";

import { Logo } from "@/src/components/logo";
import { GAME_LABEL } from "@/src/config/game";
import type { FarmGuide } from "@/src/content/farms";
import { farmNavigationAssets, regexSectionAssets, type GameAsset } from "@/src/content/game-assets";
import type { RegexSection } from "@/src/content/regex";

function NavigationArtwork({ asset }: { asset?: GameAsset }) {
  if (!asset) {
    return <Swords aria-hidden="true" size={16} strokeWidth={1.8} />;
  }

  return (
    <span className="sidebar-game-icon" aria-hidden="true">
      <Image src={asset.src} alt="" width={28} height={28} sizes="28px" />
    </span>
  );
}

type SidebarProps = {
  sections: RegexSection[];
  farms?: FarmGuide[];
  activePath: string;
  query?: string;
  mobile?: boolean;
  onNavigate?: () => void;
};

function NavItem({ section, active, query, onNavigate }: {
  section: RegexSection;
  active: boolean;
  query?: string;
  onNavigate?: () => void;
}) {
  const href = query ? `${section.path}?q=${encodeURIComponent(query)}` : section.path;

  return (
    <Link
      href={href}
      className="sidebar-link"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <NavigationArtwork asset={regexSectionAssets[section.slug]} />
      <span>{section.navigationLabel}</span>
      <span className="sidebar-count" aria-label={`${section.entries.length} entries`}>
        {section.entries.length}
      </span>
    </Link>
  );
}

export function Sidebar({ sections, farms = [], activePath, query, mobile = false, onNavigate }: SidebarProps) {
  const mapSections = sections.filter((section) => section.group === "maps");
  const tabletSections = sections.filter((section) => section.group === "tablets");

  return (
    <aside className={mobile ? "sidebar sidebar-mobile" : "sidebar"}>
      <div className="sidebar-brand-row">
        <Logo />
      </div>

      <nav className="sidebar-nav" aria-label="Regexile navigation">
        <div className="nav-group">
          <p className="nav-group-label">Core</p>
          {mapSections.map((section) => (
            <NavItem key={section.slug} section={section} active={activePath === section.path} query={query} onNavigate={onNavigate} />
          ))}
        </div>

        <div className="nav-group">
          <p className="nav-group-label">Tablets</p>
          {tabletSections.map((section) => (
            <NavItem key={section.slug} section={section} active={activePath === section.path} query={query} onNavigate={onNavigate} />
          ))}
        </div>

        {farms.length ? (
          <div className="nav-group">
            <p className="nav-group-label">Farms</p>
            {farms.map((farm) => (
              <Link
                key={farm.id}
                href={farm.path}
                className="sidebar-link sidebar-link-farm"
                data-active={activePath === farm.path || undefined}
                aria-current={activePath === farm.path ? "page" : undefined}
                onClick={onNavigate}
              >
                <NavigationArtwork asset={farmNavigationAssets[farm.slug]} />
                <span>{farm.navigationLabel}</span>
              </Link>
            ))}
          </div>
        ) : null}
      </nav>

      <div className="sidebar-footer">
        <div className="client-status">
          <span className="status-dot" aria-hidden="true" />
          <span>{GAME_LABEL} client</span>
          <span className="language-chip">EN</span>
        </div>
      </div>
    </aside>
  );
}
