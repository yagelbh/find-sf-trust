import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Diagnostics: helps detect full-page reloads vs client-side route changes.
// Remove once resolved.
try {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  // eslint-disable-next-line no-console
  console.info('[nav] navigation type:', nav?.type ?? 'unknown');
} catch {
  // ignore
}

window.addEventListener('beforeunload', () => {
  // eslint-disable-next-line no-console
  console.warn('[nav] beforeunload fired (this indicates a hard page reload/navigation)');
});

window.addEventListener('popstate', () => {
  // eslint-disable-next-line no-console
  console.info('[nav] popstate:', window.location.pathname + window.location.search);
});

createRoot(document.getElementById("root")!).render(<App />);
