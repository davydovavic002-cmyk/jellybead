export const PORTFOLIO_HEIGHT_MESSAGE = "portfolio:content-height";

const REPORT_DELAYS_MS = [0, 50, 150, 400, 900, 1800];

let reportTimers: ReturnType<typeof setTimeout>[] = [];

export function isPortfolioEmbed(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute("data-embed") === "portfolio";
}

export function measureContentHeight(): number {
  const sentinel = document.getElementById("embed-height-sentinel");
  if (sentinel) {
    const top = document.documentElement.getBoundingClientRect().top;
    return Math.ceil(sentinel.getBoundingClientRect().bottom - top);
  }
  const footer = document.querySelector("footer");
  if (footer) {
    const top = document.documentElement.getBoundingClientRect().top;
    return Math.ceil(footer.getBoundingClientRect().bottom - top);
  }
  return Math.ceil(document.documentElement.scrollHeight);
}

export function reportHeight(): void {
  if (document.documentElement.getAttribute("data-embed") !== "portfolio") return;
  const height = Math.max(measureContentHeight(), 1);
  window.parent.postMessage(
    { type: PORTFOLIO_HEIGHT_MESSAGE, height },
    "*",
  );
}

export function cancelScheduledHeightReports(): void {
  reportTimers.forEach(clearTimeout);
  reportTimers = [];
}

export function scheduleHeightReports(): void {
  cancelScheduledHeightReports();
  reportTimers = REPORT_DELAYS_MS.map((delay) => setTimeout(reportHeight, delay));
}

export function withEmbedParams(url: string): string {
  if (!isPortfolioEmbed()) return url;

  try {
    const current = new URLSearchParams(window.location.search);
    const target = new URL(url, window.location.origin);

    if (target.origin !== window.location.origin) return url;

    if (current.get("embed") === "portfolio") {
      target.searchParams.set("embed", "portfolio");
    }

    const lang = current.get("lang");
    if (lang) {
      target.searchParams.set("lang", lang);
    }

    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return url;
  }
}
