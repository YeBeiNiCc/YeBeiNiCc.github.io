import Link from "next/link";
import { reader } from "@/lib/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";

export default async function AboutPage() {
  const about = await reader.singletons.about.read().catch(() => null);

  if (!about) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1>关于</h1>
          <p>
            关于页面内容即将上线。在{" "}
            <Link href="/keystatic">后台管理</Link> 中编辑。
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
