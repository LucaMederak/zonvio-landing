import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

const figtree = localFont({
  src: "./fonts/Figtree-variable.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Zonvio 2.0 — landing page",
  description: "Minimalny szablon landing page'a Zonvio 2.0.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${figtree.className} ${figtree.variable}`}>
        <div id="modal-portal" />
        {children}
      </body>
    </html>
  );
}
