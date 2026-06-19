import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioLanguageBridge } from "@/components/PortfolioLanguageBridge";
import "./globals.css";

export const metadata: Metadata = {
  title: "JELLY BEAD — Dopamine Jewelry",
  description:
    "Premium dopamine jewelry store. Cyber candy rings, bubblegum chains, and jelly crystals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={null}>
          <PortfolioLanguageBridge>{children}</PortfolioLanguageBridge>
        </Suspense>
      </body>
    </html>
  );
}
