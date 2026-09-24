import Link from "next/link";
import {
  Aperture,
  Boxes,
  CircleDotDashed,
  Gem,
  Map,
  Orbit,
  Pentagon,
  Radiation,
  Sprout,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/src/components/logo";
import { GAME_LABEL } from "@/src/config/game";
import type { FarmGuide } from "@/src/content/farms";
import type { RegexSection } from "@/src/content/regex";

const icons: Record<string, LucideIcon> = {
  maps: Map,
  general: Sparkles,
  irradiated: Radiation,
  ritual: Pentagon,
  expedition: CircleDotDashed,
  delirium: Orbit,
  breach: Aperture,
  abyss: Boxes,
  temple: Gem,
};

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
  const Icon = icons[section.slug] ?? Swords;
  const href = query ? `${section.path}?q=${encodeURIComponent(query)}` : section.path;

  return (
    <Link
      href={href}
      className="sidebar-link"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
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
        <span className="version-chip">{GAME_LABEL.replace("PoE2 ", "")}</span>
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
                className="sidebar-link"
                data-active={activePath === farm.path || undefined}
                aria-current={activePath === farm.path ? "page" : undefined}
                onClick={onNavigate}
              >
                <Sprout aria-hidden="true" size={16} strokeWidth={1.8} />
                <span>{farm.navigationLabel}</span>
                <span className="sidebar-count" aria-label="Farm guide">Guide</span>
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
        <div className="shortcut-row">
          <span>Focus search</span>
          <kbd>/</kbd>
        </div>
      </div>
    </aside>
  );
}
