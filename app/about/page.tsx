import Link from "next/link";
import { reader } from "@/lib/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { getTranslations } from "@/lib/i18n";

export default async function AboutPage() {
  const [about, { t }] = await Promise.all([
    reader.singletons.about.read().catch(() => null),
    getTranslations(),
  ]);

  if (!about) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1>About</h1>
          <p>
            {t("about.placeholder")}
            <Link href="/keystatic">{t("about.placeholderLink")}</Link>
            {t("about.placeholderEnd")}
          </p>
        </div>
      </div>
    );
  }

  const body =
    typeof about.body === "function"
      ? await (about.body as () => Promise<unknown>)()
      : about.body;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{about.title}</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <DocumentRenderer document={body as any} />
      </div>
    </div>
  );
}
