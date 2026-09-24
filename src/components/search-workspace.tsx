"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SearchX } from "lucide-react";

import { RegexEntry } from "@/src/components/regex-entry";
import { WorkspaceShell } from "@/src/components/workspace-shell";
import { farmGuides } from "@/src/content/farms";
import type { RegexEntry as RegexEntryType, RegexSection } from "@/src/content/regex";
import { filterEntries } from "@/src/lib/search";

type Filter = "all" | "high-value" | "multi-pattern" | "needs-verification";

const filterLabels: Record<Filter, string> = {
  all: "All",
  "high-value": "High Value",
  "multi-pattern": "Multi-Pattern",
  "needs-verification": "Needs Verification",
};

function matchesFilter(entry: RegexEntryType, filter: Filter) {
  if (filter === "high-value") return entry.variant === "high-value";
  if (filter === "multi-pattern") return Boolean(entry.requireAllPatterns);
  if (filter === "needs-verification") return entry.verification === "needs-verification";
  return true;
}

export function SearchWorkspace({ sections, selectedSection, initialQuery }: {
  sections: RegexSection[];
  selectedSection: RegexSection;
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [query]);

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

  const baseResults = useMemo(
    () => query.trim()
      ? filterEntries(sections, query)
      : selectedSection.entries.map((entry) => ({ entry, section: selectedSection })),
    [query, sections, selectedSection],
  );

  const availableFilters = useMemo(() => {
    const entries = baseResults.map(({ entry }) => entry);
    return (Object.keys(filterLabels) as Filter[]).filter((key) => key === "all" || entries.some((entry) => matchesFilter(entry, key)));
  }, [baseResults]);

  const activeFilter = availableFilters.includes(filter) ? filter : "all";
  const results = useMemo(
    () => baseResults.filter(({ entry }) => matchesFilter(entry, activeFilter)),
    [activeFilter, baseResults],
  );

  const searching = Boolean(query.trim());
  const title = searching ? "Search Results" : selectedSection.title;
  const description = searching
    ? `${baseResults.length} ${baseResults.length === 1 ? "match" : "matches"} across Maps and Tablets.`
    : selectedSection.description;

  return (
    <WorkspaceShell
      sections={sections}
      farms={farmGuides}
      activePath={selectedSection.path}
      query={query}
      onQueryChange={setQuery}
      inputRef={inputRef}
    >
            <section className="section-header" aria-labelledby="page-title">
              <div>
                <p className="breadcrumb">{searching ? "Reference" : selectedSection.group === "maps" ? "Core" : "Tablets"} <span>/</span> <strong>{searching ? "Search" : selectedSection.navigationLabel}</strong></p>
                <h1 id="page-title">{title}</h1>
                <p>{description}</p>
              </div>
              {availableFilters.length > 1 ? (
                <div className="entry-filters" aria-label="Filter entries">
                  {availableFilters.map((key) => (
                    <button type="button" key={key} aria-pressed={activeFilter === key} onClick={() => setFilter(key)}>{filterLabels[key]}</button>
                  ))}
                </div>
              ) : null}
            </section>

            <div className="entry-list" aria-live="polite">
              {results.length ? (
                results.map(({ entry, section }) => (
                  <div key={entry.id} className="search-result-wrap">
                    {searching ? <span className="search-result-context">{section.navigationLabel}</span> : null}
                    <RegexEntry entry={entry} />
                  </div>
                ))
              ) : selectedSection.slug === "abyss" && !searching ? (
                <div className="empty-state">
                  <div className="empty-state-icon"><SearchX size={22} aria-hidden="true" /></div>
                  <h2>No confirmed Abyss regexes yet.</h2>
                  <p>More entries can be added as English modifier strings are verified.</p>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon"><SearchX size={22} aria-hidden="true" /></div>
                  <h2>No matching regexes</h2>
                  <p>Try a modifier name, mechanic, category, note, or regex fragment.</p>
                  <button type="button" className="clear-search" onClick={() => { setQuery(""); setFilter("all"); }}>Clear search</button>
                </div>
              )}
            </div>

            <footer className="legal-note">Regexile is an unofficial Path of Exile 2 community tool and is not affiliated with or endorsed by Grinding Gear Games.</footer>
    </WorkspaceShell>
  );
}
