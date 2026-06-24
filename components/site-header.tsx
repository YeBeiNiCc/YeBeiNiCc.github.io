import Link from "next/link";
import { reader } from "@/lib/reader";

export async function SiteHeader() {
  const settings = await reader.singletons.settings.read().catch(() => null);

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:text-blue-600 transition-colors"
        >
          {settings?.title || "My Blog"}
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/keystatic" className="text-sm hover:text-blue-600 transition-colors">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
