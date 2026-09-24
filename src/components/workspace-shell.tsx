"use client";

import type { ReactNode, RefObject } from "react";
import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { CodeXml, Menu, Search, X } from "lucide-react";

import { Sidebar } from "@/src/components/sidebar";
import { GAME_LABEL, REPOSITORY_URL } from "@/src/config/game";
import type { FarmGuide } from "@/src/content/farms";
import type { RegexSection } from "@/src/content/regex";

type WorkspaceShellProps = {
  sections: RegexSection[];
  farms: FarmGuide[];
  activePath: string;
  query: string;
  onQueryChange: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  children: ReactNode;
};

export function WorkspaceShell({
  sections,
  farms,
  activePath,
  query,
  onQueryChange,
  inputRef,
  children,
}: WorkspaceShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar sections={sections} farms={farms} activePath={activePath} query={query} />

      <div className="workspace">
        <header className="workspace-header">
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger className="mobile-menu-button" aria-label="Open navigation"><Menu size={19} aria-hidden="true" /></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="mobile-nav-backdrop" />
              <Dialog.Viewport className="mobile-nav-viewport">
                <Dialog.Popup className="mobile-nav-popup">
                  <Dialog.Title className="sr-only">Regexile navigation</Dialog.Title>
                  <Dialog.Description className="sr-only">Select a regex category or farming guide.</Dialog.Description>
                  <Dialog.Close className="mobile-nav-close" aria-label="Close navigation"><X size={18} aria-hidden="true" /></Dialog.Close>
                  <Sidebar sections={sections} farms={farms} activePath={activePath} query={query} mobile onNavigate={() => setMobileOpen(false)} />
                </Dialog.Popup>
              </Dialog.Viewport>
            </Dialog.Portal>
          </Dialog.Root>

          <label className="global-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search all regex entries</span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search regex, modifiers, mechanics..."
              autoComplete="off"
              spellCheck={false}
            />
            <kbd>/</kbd>
          </label>

          <div className="header-actions">
            <span className="header-version">{GAME_LABEL}</span>
            {REPOSITORY_URL ? (
              <a href={REPOSITORY_URL} target="_blank" rel="noreferrer" className="github-link"><CodeXml size={15} aria-hidden="true" /> GitHub</a>
            ) : null}
          </div>
        </header>

        <main className="main-content" id="main-content">
          <div className="content-inner">{children}</div>
        </main>
      </div>
    </div>
  );
}
