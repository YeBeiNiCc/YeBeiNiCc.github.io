import { collection, config, fields, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "YeBeiNiCc/YeBeiNiCc.github.io",
  },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "body" },
      columns: ["title", "publishDate"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishDate: fields.date({ label: "Publish Date" }),
        description: fields.text({ label: "Description", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        body: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: { directory: "public/uploads", publicPath: "/uploads" },
          tables: true,
        }),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "body" },
      columns: ["title", "status"],
      schema: {
        title: fields.slug({ name: { label: "Project Name" } }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Active", value: "active" },
            { label: "Completed", value: "completed" },
            { label: "On Hold", value: "on-hold" },
          ],
          defaultValue: "active",
        }),
        description: fields.text({ label: "Description", multiline: true }),
        technologies: fields.array(fields.text({ label: "Tech" }), {
          label: "Technologies Used",
          itemLabel: (props) => props.value,
        }),
        githubUrl: fields.url({ label: "GitHub Repository URL" }),
        demoUrl: fields.url({ label: "Live Demo URL" }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/uploads/projects",
          publicPath: "/uploads/projects",
        }),
        body: fields.document({
          label: "Project Details",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/uploads/projects",
            publicPath: "/uploads/projects",
          },
          tables: true,
        }),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: "Site Settings",
      path: "content/settings",
      format: "yaml",
      schema: {
        title: fields.text({ label: "Site Title" }),
        description: fields.text({ label: "Site Description", multiline: true }),
        authorName: fields.text({ label: "Author Name" }),
      },
    }),
    about: singleton({
      label: "About Page",
      path: "content/pages/about",
      format: "yaml",
      schema: {
        title: fields.text({ label: "Title" }),
        body: fields.document({ label: "Content", formatting: true, links: true }),
      },
    }),
  },
});
