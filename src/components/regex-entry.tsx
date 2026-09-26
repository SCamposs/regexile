import { BadgeCheck, CircleAlert, FlaskConical, Info } from "lucide-react";

import { CopyButton } from "@/src/components/copy-button";
import type { RegexEntry as RegexEntryType } from "@/src/content/regex";

function VerificationLabel({ entry }: { entry: RegexEntryType }) {
  if (entry.verification === "verified") {
    const sourceSummary = entry.sources?.length
      ? `Verified ${entry.sources[0].verifiedAt} using ${entry.sources.map((source) => source.name).join(", ")}`
      : undefined;
    return (
      <span className="verification verification-verified" title={sourceSummary}>
        <BadgeCheck size={13} aria-hidden="true" /> Verified
      </span>
    );
  }

  if (entry.verification === "experimental") {
    return <span className="verification verification-experimental"><FlaskConical size={13} aria-hidden="true" /> Experimental</span>;
  }

  return <span className="verification verification-pending"><CircleAlert size={13} aria-hidden="true" /> Needs verification</span>;
}

function PatternBar({ value }: { value: string }) {
  return (
    <div className="pattern-bar">
      <code title={value}>{value}</code>
      <span className="character-count" aria-label={`${value.length} characters`}>{value.length} chars</span>
      <CopyButton value={value} />
    </div>
  );
}

function MultiPattern({ entry }: { entry: RegexEntryType }) {
  return (
    <div className="multi-pattern-block">
      <div className="requirements-grid">
        {entry.patterns.map((pattern, index) => (
          <div className="requirement" key={`${entry.id}-${pattern.value}`}>
            <span className="requirement-label">{pattern.label ?? `Requirement ${index + 1}`}</span>
            <div className="requirement-pattern">
              <code>{pattern.value}</code>
              <CopyButton value={pattern.value} />
            </div>
          </div>
        ))}
        <span className="and-chip">AND</span>
      </div>
      <div className="combined-row">
        <span>Combined syntax: <code>{entry.combinedPattern}</code></span>
        <CopyButton value={entry.combinedPattern ?? ""} label={entry.combinedCopyLabel ?? "Copy both"} tone="gold" />
      </div>
    </div>
  );
}

export function RegexEntry({ entry }: { entry: RegexEntryType }) {
  return (
    <article className="regex-entry" data-variant={entry.variant ?? "default"}>
      <div className="entry-topline">
        <div className="entry-title-group">
          <h2>{entry.title}</h2>
          {entry.variant === "high-value" ? (
            <span className="entry-badge entry-badge-gold">High value</span>
          ) : entry.variant === "warning" ? (
            <span className="entry-badge entry-badge-danger"><span aria-hidden="true">!</span> Warning</span>
          ) : null}
          <span className="entry-category">{entry.category}</span>
        </div>
        <VerificationLabel entry={entry} />
      </div>

      {entry.description ? <p className="entry-description">{entry.description}</p> : null}

      {entry.requireAllPatterns && entry.combinedPattern ? (
        <MultiPattern entry={entry} />
      ) : entry.patterns[0] ? (
        <PatternBar value={entry.patterns[0].value} />
      ) : (
        <div className="pending-pattern">
          <CircleAlert size={15} aria-hidden="true" />
          <span>Copyable pattern withheld until the English modifier is confirmed.</span>
        </div>
      )}

      {entry.notes?.length ? (
        <ul className="entry-notes" aria-label="Notes">
          {entry.notes.map((note) => (
            <li key={note}><Info size={13} aria-hidden="true" /><span>{note}</span></li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
