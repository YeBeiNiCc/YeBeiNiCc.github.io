import Link from "next/link";
import { reader } from "@/lib/reader";
import { getTranslations } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export async function SiteHeader() {
  const [settings, { t, locale }] = await Promise.all([
    reader.singletons.settings.read().catch(() => null),
    getTranslations(),
  ]);

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:text-blue-600 transition-colors"
        >
          {settings?.title || "My Blog"}
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm hover:text-blue-600 transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-blue-600 transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/keystatic"
              className="text-sm hover:text-blue-600 transition-colors"
            >
              {t("nav.admin")}
            </Link>
          </nav>
          <LanguageSwitcher current={locale} />
        </div>
      </div>
    </header>
  );
}
