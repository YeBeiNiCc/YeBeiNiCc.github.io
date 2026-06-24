import { ReactNode } from "react";

// Remove flex constraints for the Keystatic admin SPA
const styles = `
  [data-keystatic-root] {
    min-height: 100vh;
  }
  [data-keystatic-root] > main {
    flex: 1;
  }
  /* Ensure the editor content area is visible and scrollable */
  [data-keystatic-root] .ProseMirror {
    min-height: 200px;
    padding: 16px;
  }
`;

export default function KeystaticLayout({ children }: { children: ReactNode }) {
  return (
    <div data-keystatic-root style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <style>{styles}</style>
      {children}
    </div>
  );
}
