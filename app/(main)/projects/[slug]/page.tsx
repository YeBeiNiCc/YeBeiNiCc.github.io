import { notFound } from "next/navigation";
import Link from "next/link";
import { reader } from "@/lib/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";

export async function generateStaticParams() {
  const projects = await reader.collections.projects.all();
  return projects.map((proj: { slug: string }) => ({ slug: proj.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proj = await reader.collections.projects.read(slug);
  if (!proj) return { title: "Not Found" };
  return { title: proj.title, description: proj.description };
}

const statusLabels: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "on-hold": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proj = await reader.collections.projects.read(slug);

  if (!proj) notFound();

  const p = proj as any;
  const body =
    typeof p.body === "function"
      ? await (p.body as () => Promise<unknown>)()
      : p.body;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/projects"
        className="text-sm text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to Projects
      </Link>

      {p.coverImage && (
        <div className="mb-8 rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.coverImage}
            alt={p.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span
            className={`text-sm px-3 py-0.5 rounded-full font-medium ${
              statusColors[p.status || "active"]
            }`}
          >
            {statusLabels[p.status || "active"]}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
          {p.title}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          {p.description}
        </p>

        {p.technologies && p.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {p.technologies.map((tech: string) => (
              <span
                key={tech}
                className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {p.demoUrl && (
            <a
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </header>

      {body && (
        <div className="prose prose-lg dark:prose-invert max-w-none border-t border-gray-200 dark:border-gray-800 pt-8">
          <DocumentRenderer document={body as any} />
        </div>
      )}
    </article>
  );
}
