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
          images: {
            directory: "public/uploads",
            publicPath: "/uploads",
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
        body: fields.document({
          label: "Content",
          formatting: true,
          links: true,
        }),
      },
    }),
  },
});
