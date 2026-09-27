"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Info,
  ListChecks,
  Route,
  Tags,
} from "lucide-react";

import { RegexEntry } from "@/src/components/regex-entry";
import { WorkspaceShell } from "@/src/components/workspace-shell";
import { farmGuides, type FarmGuide, type FarmSection, type GameAsset } from "@/src/content/farms";
import { getRegexEntry, regexSections, type RegexEntry as RegexEntryType } from "@/src/content/regex";
import { filterEntries } from "@/src/lib/search";

const farmTypeLabels: Record<FarmGuide["farmTypes"][number], string> = {
  city: "City",
  transit: "Transit",
  "map-spam": "Map Spam",
  mechanic: "Mechanic",
  boss: "Boss",
};

function resolveRegexEntries(ids: string[]): RegexEntryType[] {
  return ids.map(getRegexEntry).filter((entry): entry is RegexEntryType => Boolean(entry));
}

function SearchResults({ query }: { query: string }) {
  const results = useMemo(() => filterEntries(regexSections, query), [query]);

  return (
    <>
      <section className="section-header" aria-labelledby="page-title">
        <div>
          <p className="breadcrumb">Reference <span>/</span> <strong>Search</strong></p>
          <h1 id="page-title">Search Results</h1>
          <p>{results.length} {results.length === 1 ? "match" : "matches"} across Maps and Tablets.</p>
        </div>
      </section>
      <div className="entry-list" aria-live="polite">
        {results.length ? results.map(({ entry, section }) => (
          <div key={entry.id} className="search-result-wrap">
            <span className="search-result-context">{section.navigationLabel}</span>
            <RegexEntry entry={entry} />
          </div>
        )) : (
          <div className="empty-state">
            <h2>No matching regexes</h2>
            <p>Try a modifier name, mechanic, category, note, or regex fragment.</p>
          </div>
        )}
      </div>
    </>
  );
}

function GameArtwork({ asset, size = "section" }: { asset: GameAsset; size?: "item" | "section" | "hero" }) {
  const pixels = size === "hero" ? 80 : size === "item" ? 30 : 42;

  return (
    <span className="game-artwork" data-size={size} title={asset.alt}>
      <Image src={asset.src} alt="" width={pixels} height={pixels} />
    </span>
  );
}

function SectionHeading({ id, title, description, icon, asset }: { id: string; title: string; description?: string; icon?: React.ReactNode; asset?: GameAsset }) {
  return (
    <div className="farm-section-heading">
      <div className="farm-heading-lockup">
        {asset ? <GameArtwork asset={asset} /> : null}
        {!asset && icon ? <span className="farm-section-icon">{icon}</span> : null}
        <div><h2 id={id}>{title}</h2>{description ? <p>{description}</p> : null}</div>
      </div>
    </div>
  );
}

function FarmSectionContent({ section, sectionId }: { section: FarmSection; sectionId: string }) {
  if (section.type === "master") {
    const nodeGroups = [
      { label: "Required nodes", nodes: section.required },
      ...(section.optional?.length ? [{ label: "Optional", nodes: section.optional }] : []),
    ];

    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} />
        <div className="farm-master">
          <div className="farm-master-identity">
            <div className="farm-master-portrait"><Image src={section.portrait.src} alt="" fill sizes="(max-width: 700px) 96px, 128px" /></div>
            <div><span>Atlas Master</span><h3>{section.name}</h3></div>
          </div>
          <div className="farm-master-groups">
            {nodeGroups.map((group) => (
              <div className="farm-master-group" key={group.label}>
                <h3>{group.label}</h3>
                <div className="farm-master-nodes">
                  {group.nodes.map((node) => (
                    <article className="farm-master-node" key={node.id}>
                      <GameArtwork asset={node.asset} size="item" />
                      <div><strong>{node.name}</strong><p>{node.summary}</p></div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "summary") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} icon={<ListChecks size={18} aria-hidden="true" />} />
        <dl className="farm-summary-grid">
          {section.items.map((item) => (
            <div key={item.label} data-tone={item.tone ?? "default"}><dt>{item.label}</dt><dd>{item.value}</dd></div>
          ))}
        </dl>
      </section>
    );
  }

  if (section.type === "checklists") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} />
        <div className="requirement-columns" data-columns={section.columns.length}>
          {section.columns.map((column) => (
            <div className={`farm-panel farm-panel-${column.tone}`} key={column.title}>
              <div className="farm-panel-title">
                <h3>{column.title}</h3>
              </div>
              <ul className="farm-checklist">
                {column.items.map((item) => <li data-has-art={item.asset ? "true" : undefined} key={item.id}>{item.asset ? <GameArtwork asset={item.asset} size="item" /> : <span className="checklist-marker" aria-hidden="true" />}<span><strong>{item.label}</strong>{item.detail}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "callout") {
    return (
      <section className={`farm-callout farm-callout-${section.tone}`} data-has-marker={section.tone === "danger" || undefined} aria-labelledby={sectionId}>
        {section.tone === "danger" ? <span className="warning-mark" aria-hidden="true">!</span> : null}
        <div>
          {section.eyebrow ? <span className="instruction-label">{section.eyebrow}</span> : null}
          <h2 id={sectionId}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.sequence?.length ? (
            <div className="boss-order">
              {section.sequence.map((step, index) => (
                <span className="farm-sequence-part" key={step}>{index === 0 ? <strong>{step}</strong> : <span>{step}</span>}{index < section.sequence!.length - 1 ? <ArrowRight size={14} aria-hidden="true" /> : null}</span>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  if (section.type === "tablets") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <div className="farm-section-heading">
          <div className={section.asset ? "farm-heading-lockup" : undefined}>
            {section.asset ? <GameArtwork asset={section.asset} /> : null}
            <div><h2 id={sectionId}>{section.title}</h2><p>{section.description}</p></div>
          </div>
          {section.status ? <span className="farm-section-status">{section.status}</span> : null}
        </div>
        <div className="tablet-coverage">
          {section.requirements.map((item) => (
            <article className="coverage-row" key={item.id}>
              <span className="coverage-count">{item.count}</span>
              <div><h3>{item.label}</h3><p>{item.purpose}</p></div>
              <div className="coverage-roll"><span>{item.range}</span><strong>{item.recommendation}</strong></div>
            </article>
          ))}
        </div>
        {section.note ? <div className="farm-inline-note"><Info size={15} aria-hidden="true" /><span>{section.note}</span></div> : null}
        {section.extras ? <div className="secondary-modifiers"><h3>{section.extras.title}</h3><ul>{section.extras.items.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
      </section>
    );
  }

  if (section.type === "ranked") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} icon={<Route size={18} aria-hidden="true" />} />
        <ol className="route-priority">
          {section.items.map((item) => <li key={item.rank}><span className="route-rank">{item.rank}</span><div><strong>{item.label}</strong><p>{item.reason}</p></div></li>)}
        </ol>
        {section.extras ? <div className="also-useful"><h3>{section.extras.title}</h3><div>{section.extras.items.map((item) => <span key={item}>{item}</span>)}</div>{section.extras.note ? <p>{section.extras.note}</p> : null}</div> : null}
      </section>
    );
  }

  if (section.type === "cards") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} />
        <div className="farm-guidance-list">
          {section.items.map((item) => <article className="farm-guidance-row" data-tone={item.tone ?? "neutral"} key={item.label}><span className="guidance-marker" aria-hidden="true" /><div><strong>{item.label}</strong><p>{item.detail}</p></div></article>)}
        </div>
      </section>
    );
  }

  if (section.type === "tree") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} asset={section.asset} />
        <div className="tree-warning"><span className="warning-mark" aria-hidden="true">!</span><span>{section.warning}</span></div>
        <div className="farm-tree" data-tree-id={section.treeId}>
          {section.nodes.map((node) => (
            <article className="farm-tree-node" data-priority={node.priority} key={node.id}>
              <span className="tree-node-marker" aria-hidden="true" />
              <div><div className="tree-node-title"><h3>{node.name}</h3><span>{node.priority}</span></div><p>{node.note}</p><code>{node.id}</code></div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "regex") {
    return (
      <section className="farm-section farm-regex-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} />
        {section.groups.map((group) => (
          <div className="farm-regex-group" key={group.label}>
            <h3>{group.label}</h3>
            <div className="entry-list">{resolveRegexEntries(group.entryIds).map((entry) => <RegexEntry key={entry.id} entry={entry} />)}</div>
          </div>
        ))}
      </section>
    );
  }

  if (section.type === "rewards") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} asset={section.asset} />
        <ul className="reward-grid">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
        {section.note ? <div className="farm-inline-note"><Info size={15} aria-hidden="true" /><span>{section.note}</span></div> : null}
      </section>
    );
  }

  if (section.type === "tags") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} icon={<Tags size={18} aria-hidden="true" />} />
        <div className="farm-tag-list">{section.items.map((item) => <span key={item}>{item}</span>)}</div>
      </section>
    );
  }

  if (section.type === "links") {
    return (
      <section className="farm-section" aria-labelledby={sectionId}>
        <SectionHeading id={sectionId} title={section.title} description={section.description} />
        <div className="farm-link-list">
          {section.links.map((link) => <a href={link.url} target={link.external === false ? undefined : "_blank"} rel={link.external === false ? undefined : "noreferrer"} key={link.url}><span><strong>{link.label}</strong>{link.note ? <small>{link.note}</small> : null}</span>{link.external === false ? <ArrowRight size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</a>)}
        </div>
      </section>
    );
  }

  return (
    <section className="farm-section" aria-labelledby={sectionId}>
      <SectionHeading id={sectionId} title={section.title} />
      <ul className="farm-note-list">{section.items.map((item) => <li key={item}><Info size={14} aria-hidden="true" /><span>{item}</span></li>)}</ul>
    </section>
  );
}

function FarmGuideContent({ guide }: { guide: FarmGuide }) {
  const titleParts = guide.title.split("—");
  const displayTitle = titleParts.length > 1 ? titleParts.slice(1).join("—").trim() : guide.title;
  const featuredRegexSection = guide.sections.find((section) => section.type === "regex");
  const featuredRegexGroup = featuredRegexSection?.groups.find((group) => group.label.toLowerCase().includes("waystone"));

  return (
    <>
      <section className="section-header farm-header" aria-labelledby="page-title">
        <div className="farm-title-block">
          <p className="breadcrumb">Farms <span>/</span> <strong>{guide.mechanic}</strong></p>
          <div className="farm-title-lockup">
            <div>
              <h1 id="page-title">{displayTitle}</h1>
              <p>{guide.description}</p>
            </div>
          </div>
          <div className="farm-meta" aria-label="Farm metadata">
            <span><strong>Patch</strong> {guide.gameVersion}</span>
            <span><strong>Type</strong> {guide.farmTypes.map((type) => farmTypeLabels[type]).join(" / ")}</span>
            {guide.difficulty ? <span><strong>Difficulty</strong> {guide.difficulty}</span> : null}
            {guide.investment ? <span><strong>Investment</strong> {guide.investment}</span> : null}
          </div>
        </div>
      </section>

      {featuredRegexGroup ? (
        <section className="farm-section farm-regex-section farm-featured-regex" aria-labelledby="featured-regex-title">
          <SectionHeading id="featured-regex-title" title="Waystone regex" description={featuredRegexGroup.label} />
          <div className="entry-list">{resolveRegexEntries(featuredRegexGroup.entryIds).map((entry) => <RegexEntry key={entry.id} entry={entry} />)}</div>
        </section>
      ) : null}

      <div className="farm-flow" aria-label="Farm flow">
        {guide.flow.map((step, index) => <div className="farm-flow-step" key={step.id}><span>{step.label}</span>{index < guide.flow.length - 1 ? <ArrowRight size={14} aria-hidden="true" /> : null}</div>)}
      </div>

      {guide.sections.map((section, index) => {
        const visibleSection = section.type === "regex" && featuredRegexGroup
          ? { ...section, groups: section.groups.filter((group) => group !== featuredRegexGroup) }
          : section;

        return <FarmSectionContent key={`${section.type}-${section.title}`} section={visibleSection} sectionId={`farm-section-${index}`} />;
      })}

      {guide.sources.length ? (
        <section className="farm-sources" aria-labelledby="farm-sources-title">
          <h2 id="farm-sources-title">Verification sources</h2>
          <div>{guide.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.name}<ArrowUpRight size={12} aria-hidden="true" /></a>)}</div>
        </section>
      ) : null}

      <footer className="legal-note">Regexile is an unofficial Path of Exile 2 community tool and is not affiliated with or endorsed by Grinding Gear Games.</footer>
    </>
  );
}

export function FarmWorkspace({ guide }: { guide: FarmGuide }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isEditable = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) && !isEditable) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        if (query) setQuery("");
        else inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [query]);

  return (
    <WorkspaceShell sections={regexSections} farms={farmGuides} activePath={guide.path} query={query} onQueryChange={setQuery} inputRef={inputRef}>
      {query.trim() ? <SearchResults query={query} /> : <FarmGuideContent guide={guide} />}
    </WorkspaceShell>
  );
}
