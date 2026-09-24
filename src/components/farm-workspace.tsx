"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleDollarSign,
  Crown,
  Info,
  MapPinned,
  Route,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import { RegexEntry } from "@/src/components/regex-entry";
import { WorkspaceShell } from "@/src/components/workspace-shell";
import { farmGuides, type FarmGuide } from "@/src/content/farms";
import { getRegexEntry, regexSections, type RegexEntry as RegexEntryType } from "@/src/content/regex";
import { filterEntries } from "@/src/lib/search";

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

function FarmGuideContent({ guide }: { guide: FarmGuide }) {
  const mandatory = guide.requirements.filter((item) => item.kind === "mandatory");
  const recommended = guide.requirements.filter((item) => item.kind === "recommended");

  return (
    <>
      <section className="section-header farm-header" aria-labelledby="page-title">
        <div>
          <p className="breadcrumb">Farms <span>/</span> <strong>{guide.navigationLabel}</strong></p>
          <h1 id="page-title">{guide.title}</h1>
          <p>{guide.description}</p>
        </div>
        <div className="farm-meta" aria-label="Farm metadata">
          <span><strong>Patch</strong> {guide.gameVersion}</span>
          <span><strong>Difficulty</strong> {guide.difficulty}</span>
          <span><strong>Investment</strong> {guide.investment}</span>
        </div>
      </section>

      <div className="farm-flow" aria-label="Farm flow">
        {guide.flow.map((step, index) => (
          <div className="farm-flow-step" key={step.id}>
            <span>{step.label}</span>
            {index < guide.flow.length - 1 ? <ArrowRight size={14} aria-hidden="true" /> : null}
          </div>
        ))}
      </div>

      <section className="farm-section" aria-labelledby="requirements-title">
        <div className="farm-section-heading">
          <div><h2 id="requirements-title">Preparation</h2><p>Build requirements and recommended Waystone targets.</p></div>
        </div>
        <div className="requirement-columns">
          <div className="farm-panel farm-panel-required">
            <div className="farm-panel-title"><ShieldAlert size={16} aria-hidden="true" /><h3>Mandatory</h3></div>
            <ul className="farm-checklist">
              {mandatory.map((item) => <li key={item.id}><Check size={14} aria-hidden="true" /><span><strong>{item.label}</strong>{item.detail}</span></li>)}
            </ul>
          </div>
          <div className="farm-panel farm-panel-recommended">
            <div className="farm-panel-title"><BadgeCheck size={16} aria-hidden="true" /><h3>Recommended Waystone</h3></div>
            <ul className="farm-checklist">
              {recommended.map((item) => <li key={item.id}><Check size={14} aria-hidden="true" /><span><strong>{item.label}</strong>{item.detail}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="farm-callout farm-callout-gold" aria-labelledby="freedom-title">
        <Crown size={21} aria-hidden="true" />
        <div>
          <h2 id="freedom-title">Why Freedom of Faith is core</h2>
          <p><strong>Can Reroll Favours at Ritual Altars in your Maps twice as many times.</strong> Favours cost 10–15% increased Tribute, but this setup is built to generate a large Tribute pool and reduce Defer and Reroll costs.</p>
          <p>Each Ritual completed during the Rite adds another reroll to future Rituals in the chain. Additional-reroll Tablets and Freedom of Faith multiply that snowball.</p>
        </div>
      </section>

      <section className="farm-section" aria-labelledby="tablets-title">
        <div className="farm-section-heading">
          <div><h2 id="tablets-title">Tablet coverage</h2><p>Distribute these modifiers across rare Ritual Tablets in any combination.</p></div>
          <span className="farm-section-status">Freedom of Faith + required coverage</span>
        </div>
        <div className="tablet-coverage">
          {guide.tabletRequirements.map((item) => (
            <article className="coverage-row" key={item.id}>
              <span className="coverage-count">{item.minimum}×</span>
              <div><h3>{item.label}</h3><p>{item.purpose}</p></div>
              <div className="coverage-roll"><span>{item.range}</span><strong>Best: {item.strongestRoll}</strong></div>
            </article>
          ))}
        </div>
        <div className="farm-inline-note"><Info size={15} aria-hidden="true" /><span>Modifiers may overlap on the same Tablet. Divine Orbs can improve numeric rolls when the cost makes sense, but they are not automatically the economical choice.</span></div>
        <div className="secondary-modifiers">
          <h3>Optional secondary rolls</h3>
          <ul>{guide.optionalTabletModifiers.map((modifier) => <li key={modifier}>{modifier}</li>)}</ul>
        </div>
      </section>

      <section className="farm-section" aria-labelledby="route-title">
        <div className="farm-section-heading">
          <div><h2 id="route-title">Route priority</h2><p>Complete strong Foretold Proliferations early so later Rite maps inherit them.</p></div>
          <Route size={18} aria-hidden="true" />
        </div>
        <ol className="route-priority">
          {guide.routePriorities.map((item) => (
            <li key={item.rank}><span className="route-rank">{item.rank}</span><div><strong>{item.label}</strong><p>{item.reason}</p></div></li>
          ))}
        </ol>
        <div className="also-useful"><h3>Also useful</h3><div>{guide.usefulRouteModifiers.map((item) => <span key={item}>{item}</span>)}</div><p>Do not rank a tiny guaranteed Bounty above a strong Proliferation by default. Evaluate explicit high-value Omens or Uniques separately.</p></div>
      </section>

      <section className="farm-callout farm-callout-danger" aria-labelledby="boss-title">
        <AlertTriangle size={22} aria-hidden="true" />
        <div>
          <span className="instruction-label">Required run rule</span>
          <h2 id="boss-title">Boss Ritual first</h2>
          <p>Rush the map boss, kill it and complete the boss-room Ritual before any other altar. If a Summoning Circle Ritual is present, do it next. Then complete the remaining Rituals.</p>
          <div className="boss-order"><strong>Boss Ritual</strong><ArrowRight size={14} /><span>Summoning Circle if present</span><ArrowRight size={14} /><span>Remaining Rituals</span></div>
          <p className="farm-callout-detail">Rituals accumulate monsters during a continuous encounter. The Rite also carries progression and previously defeated map bosses through the chain, with bosses joining later final Ritual encounters.</p>
        </div>
      </section>

      <section className="farm-section" aria-labelledby="decisions-title">
        <div className="farm-section-heading">
          <div><h2 id="decisions-title">During each Ritual</h2><p>Protect the reroll budget first, then spend the surplus on optional re-defers.</p></div>
          <CircleDollarSign size={18} aria-hidden="true" />
        </div>
        <div className="decision-layout">
          <div className="decision-list">
            {guide.decisions.map((decision) => (
              <div className="decision-row" data-tone={decision.tone} key={decision.label}><strong>{decision.label}</strong><p>{decision.action}</p></div>
            ))}
          </div>
          <aside className="tribute-example" aria-label="Tribute buffer estimation example">
            <div className="tribute-heading"><span>Estimation example</span><strong>Reserve rerolls first</strong></div>
            <dl>
              <div><dt>Current Tribute</dt><dd>14,000</dd></div>
              <div><dt>Remaining rerolls</dt><dd>12</dd></div>
              <div><dt>Average reroll cost</dt><dd>~1,000</dd></div>
              <div className="tribute-reserved"><dt>Reserved budget</dt><dd>~12,000</dd></div>
              <div className="tribute-free"><dt>Approximate free Tribute</dt><dd>~2,000</dd></div>
            </dl>
            <p>This is an estimation technique, not an exact formula. Reroll costs can vary.</p>
          </aside>
        </div>
      </section>

      <section className="farm-section" aria-labelledby="mechanics-title">
        <div className="farm-section-heading"><div><h2 id="mechanics-title">Mechanics notes</h2><p>Why the recommended Waystone stats matter.</p></div><MapPinned size={18} aria-hidden="true" /></div>
        <div className="mechanic-notes">
          <div><strong>Monster Rarity</strong><p>Tribute depends on monster rarity. More Monster Rarity increases the chance for Magic and Rare monsters, which contribute more Tribute.</p></div>
          <div><strong>Pack Size</strong><p>More monsters around Ritual circles increases the pool available to be sacrificed and revived. Pack Size helps density, but does not guarantee a specific Tribute total.</p></div>
        </div>
      </section>

      <section className="farm-section farm-regex-section" aria-labelledby="regex-title">
        <div className="farm-section-heading"><div><h2 id="regex-title">Regex for this farm</h2><p>These tools reference the normal Regexile entries by ID and use the same copy controls.</p></div><Sparkles size={18} aria-hidden="true" /></div>
        {guide.regexGroups.map((group) => (
          <div className="farm-regex-group" key={group.label}>
            <h3>{group.label}</h3>
            <div className="entry-list">
              {resolveRegexEntries(group.entryIds).map((entry) => <RegexEntry key={entry.id} entry={entry} />)}
            </div>
          </div>
        ))}
      </section>

      <section className="farm-callout farm-callout-neutral">
        <Info size={19} aria-hidden="true" />
        <div><h2>Outcome expectations</h2><p>{guide.warnings[1]} The strategy aims for consistent value through Omens while retaining the chance of expensive Unique Favours.</p></div>
      </section>

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
