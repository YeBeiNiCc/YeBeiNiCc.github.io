"use client";

import dynamic from "next/dynamic";
import keystaticConfig from "@/keystatic.config";

const KeystaticPage = dynamic(
  () =>
    import("@keystatic/next/ui/app").then((mod) => {
      const Page = mod.makePage(keystaticConfig);
      return Page;
    }),
  { ssr: false }
);

export default function AdminPage() {
  return <KeystaticPage />;
}
