import Link from "next/link";
import { reader } from "@/lib/reader";

export default async function PostsPage() {
  const posts = await reader.collections.posts.all();

  const sortedPosts = posts
    .filter((post) => post.entry.publishDate)
    .sort(
      (a, b) =>
        new Date(b.entry.publishDate!).getTime() -
        new Date(a.entry.publishDate!).getTime()
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>
      {sortedPosts.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No posts yet.{" "}
          <Link href="/keystatic" className="text-blue-600 hover:underline">
            Write your first post →
          </Link>
        </p>
      ) : (
        <div className="space-y-8">
          {sortedPosts.map((post) => (
            <article key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="group block">
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {post.entry.title}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <time>
                    {new Date(post.entry.publishDate!).toLocaleDateString(
                      "zh-CN",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>
                  {post.entry.tags && post.entry.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {post.entry.description && (
                  <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.entry.description}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
