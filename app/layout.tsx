import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Regexile — Path of Exile 2 Regex Reference",
    template: "%s | Regexile",
  },
  description:
    "Ready-to-copy Path of Exile 2 regex patterns for maps, tablets, Ritual, Expedition, Delirium, Breach and more.",
  applicationName: "Regexile",
  icons: {
    icon: "/logo-dark-mode.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body>
        <div className="root">{children}</div>
      </body>
    </html>
  );
}
