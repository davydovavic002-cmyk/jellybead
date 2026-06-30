"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AppProvider } from "@/context/AppContext";
import { PortfolioEmbedBridge } from "@/components/PortfolioEmbedBridge";
import type { Language } from "@/types";

const PORTFOLIO_LANG_MESSAGE = "portfolio:set-language";
const LANGUAGES: Language[] = ["ru", "en", "am"];

function parseLanguage(value: unknown): Language | undefined {
  return typeof value === "string" && LANGUAGES.includes(value as Language)
    ? (value as Language)
    : undefined;
}

interface PortfolioLanguageBridgeProps {
  children: ReactNode;
}

export function PortfolioLanguageBridge({ children }: PortfolioLanguageBridgeProps) {
  const searchParams = useSearchParams();
  const urlLanguage = parseLanguage(searchParams.get("lang"));
  const [messageLanguage, setMessageLanguage] = useState<Language | undefined>();

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const next = parseLanguage(event.data?.language);
      if (event.data?.type === PORTFOLIO_LANG_MESSAGE && next) {
        setMessageLanguage(next);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <AppProvider initialLanguage={urlLanguage} externalLanguage={messageLanguage}>
      <PortfolioEmbedBridge />
      {children}
    </AppProvider>
  );
}
