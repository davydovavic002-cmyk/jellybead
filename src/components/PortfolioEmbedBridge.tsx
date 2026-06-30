"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  cancelScheduledHeightReports,
  isPortfolioEmbed,
  scheduleHeightReports,
  withEmbedParams,
} from "@/embed/portfolioEmbed";

export function PortfolioEmbedBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { state } = useApp();

  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    const onLoad = () => scheduleHeightReports();
    if (document.readyState === "complete") {
      scheduleHeightReports();
    } else {
      window.addEventListener("load", onLoad);
    }

    const observed = new Set<Element>();
    const resizeObserver = new ResizeObserver(() => scheduleHeightReports());

    const observeTargets = () => {
      const targets = [
        document.getElementById("embed-height-sentinel"),
        document.querySelector("main"),
        document.body.firstElementChild,
      ];

      for (const target of targets) {
        if (target && !observed.has(target)) {
          observed.add(target);
          resizeObserver.observe(target);
        }
      }
    };

    observeTargets();
    const mutationObserver = new MutationObserver(observeTargets);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let resolved: URL;
      try {
        resolved = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (resolved.origin !== window.location.origin) return;

      const nextHref = withEmbedParams(resolved.pathname + resolved.search + resolved.hash);
      if (nextHref === href) return;

      event.preventDefault();
      window.location.assign(nextHref);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("load", onLoad);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener("click", onClick, true);
      cancelScheduledHeightReports();
    };
  }, []);

  useEffect(() => {
    if (!isPortfolioEmbed()) return;
    scheduleHeightReports();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isPortfolioEmbed()) return;
    scheduleHeightReports();
  }, [state.language]);

  return null;
}
