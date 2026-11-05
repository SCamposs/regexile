import type { RegexEntry, RegexSection } from "@/src/content/regex";
import type { FarmGuide } from "@/src/content/farms";

const normalize = (value: string) => value.toLocaleLowerCase("en").trim();

export function filterFarmGuides(guides: FarmGuide[], query: string) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return guides.filter((guide) => {
    const text = normalize([
      guide.title, guide.navigationLabel, guide.mechanic, guide.description,
      ...guide.flow.map((step) => step.label),
      ...guide.sections.flatMap((section) => section.type === "master"
        ? [section.name, ...section.required.map((node) => node.name), ...(section.optional ?? []).map((node) => node.name)]
        : [section.title]),
    ].join(" "));
    return terms.every((term) => text.includes(term));
  });
}

export function entrySearchText(entry: RegexEntry, section: RegexSection) {
  return normalize(
    [
      entry.title,
      entry.description,
      entry.category,
      section.title,
      section.navigationLabel,
      ...entry.patterns.flatMap((pattern) => [pattern.value, pattern.label, pattern.sourceText]),
      ...(entry.tags ?? []),
      ...(entry.notes ?? []),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

export function filterEntries(
  sections: RegexSection[],
  query: string,
): Array<{ entry: RegexEntry; section: RegexSection }> {
  const terms = normalize(query).split(/\s+/).filter(Boolean);

  return sections.flatMap((section) =>
    section.entries
      .filter((entry) => {
        const haystack = entrySearchText(entry, section);
        return terms.every((term) => haystack.includes(term));
      })
      .map((entry) => ({ entry, section })),
  );
}
