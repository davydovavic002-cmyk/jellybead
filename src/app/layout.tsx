import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioLanguageBridge } from "@/components/PortfolioLanguageBridge";
import "./globals.css";

export const metadata: Metadata = {
  title: "JELLY BEAD — Dopamine Jewelry",
  description:
    "Premium dopamine jewelry store. Cyber candy rings, bubblegum chains, and jelly crystals.",
};

const portfolioEmbedDetectScript = `
(function () {
  try {
    if (new URLSearchParams(location.search).get("embed") === "portfolio") {
      document.documentElement.setAttribute("data-embed", "portfolio");
    }
  } catch (e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: portfolioEmbedDetectScript }} />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <PortfolioLanguageBridge>{children}</PortfolioLanguageBridge>
        </Suspense>
      </body>
    </html>
  );
}
