import { notFound } from "next/navigation";
import Link from "next/link";
import { reader } from "@/lib/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { getTranslations } from "@/lib/i18n";

export async function generateStaticParams() {
  const posts = await reader.collections.posts.all();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.description };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, { t }] = await Promise.all([
    reader.collections.posts.read(slug),
    getTranslations(),
  ]);

  if (!post) notFound();

  const body =
    typeof post.body === "function"
      ? await (post.body as () => Promise<unknown>)()
      : post.body;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          {t("post.backToHome")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
          {post.publishDate && (
            <time>
              {new Date(post.publishDate).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <DocumentRenderer document={body as any} />
      </div>
    </article>
  );
}
