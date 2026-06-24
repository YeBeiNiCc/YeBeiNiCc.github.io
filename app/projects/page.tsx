import Link from "next/link";
import { reader } from "@/lib/reader";

export default async function ProjectsPage() {
  const projects = await reader.collections.projects.all();

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No projects yet.{" "}
          <Link href="/keystatic" className="text-blue-600 hover:underline">
            Create your first project →
          </Link>
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {project.entry.coverImage && (
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.entry.coverImage}
                    alt={project.entry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      statusColors[project.entry.status || "active"]
                    }`}
                  >
                    {statusLabels[project.entry.status || "active"]}
                  </span>
                </div>
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors mb-1">
                  {project.entry.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {project.entry.description}
                </p>
                {project.entry.technologies &&
                  project.entry.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.entry.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
