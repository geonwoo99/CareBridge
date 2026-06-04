// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "guide",
        label: "Guides",
        path: "content/guides/care-guide",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "titleEn", label: "Title (English)" },
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "category", label: "Category", options: ["assessment", "care_guide", "calculator"], required: true },
          { type: "string", name: "species", label: "Species", list: true, options: ["dog", "cat", "common"] },
          { type: "string", name: "summary", label: "Summary", ui: { component: "textarea" } },
          {
            type: "object",
            name: "sources",
            label: "Sources",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "Link (Optional)" }
            ]
          },
          { type: "image", name: "cover", label: "Cover Image" },
          { type: "datetime", name: "updated", label: "Updated Date", ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "string", name: "reviewedBy", label: "Reviewed By" },
          { type: "datetime", name: "nextReview", label: "Next Review Date", ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "string", name: "guidelineVersion", label: "Guideline Version" },
          { type: "boolean", name: "draft", label: "Draft" },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Figure",
                label: "Figure (Image)",
                fields: [
                  { type: "image", name: "src", label: "Image Source", required: true },
                  { type: "string", name: "alt", label: "Alt Text", required: true },
                  { type: "string", name: "size", label: "Size", options: ["small", "medium", "full"] },
                  { type: "string", name: "align", label: "Alignment", options: ["left", "center", "right"] },
                  { type: "string", name: "caption", label: "Caption" },
                  { type: "number", name: "width", label: "Width" },
                  { type: "number", name: "height", label: "Height" }
                ]
              },
              {
                name: "TableOfContents",
                label: "Table Of Contents",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  {
                    type: "object",
                    name: "items",
                    label: "Items",
                    list: true,
                    fields: [
                      { type: "string", name: "number", label: "Number", required: true },
                      { type: "string", name: "title", label: "Title", required: true },
                      { type: "string", name: "anchor", label: "Anchor (ID)", required: true }
                    ]
                  }
                ]
              },
              {
                name: "StatusList",
                label: "Status List",
                fields: [
                  { type: "string", name: "type", label: "Type", options: ["success", "danger", "warning"] },
                  { type: "string", name: "badgeText", label: "Badge Text", required: true },
                  { type: "string", name: "title", label: "Title", required: true },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "items",
                    label: "Items",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Title", required: true },
                      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                    ]
                  }
                ]
              },
              {
                name: "SourceNotice",
                label: "Source Notice",
                fields: [
                  { type: "string", name: "badge", label: "Badge" },
                  {
                    type: "object",
                    name: "sources",
                    label: "Sources",
                    list: true,
                    fields: [
                      { type: "string", name: "label", label: "Label", required: true },
                      { type: "string", name: "href", label: "URL" }
                    ]
                  },
                  { type: "string", name: "notes", label: "Notes", list: true, required: true }
                ]
              },
              {
                name: "CompareColumns",
                label: "Compare Columns",
                fields: [
                  {
                    type: "object",
                    name: "left",
                    label: "Left Column",
                    required: true,
                    fields: [
                      { type: "string", name: "icon", label: "Icon" },
                      { type: "string", name: "label", label: "Label", required: true },
                      { type: "string", name: "title", label: "Title", required: true },
                      { type: "string", name: "caption", label: "Caption" },
                      {
                        type: "object",
                        name: "items",
                        label: "Items",
                        list: true,
                        fields: [
                          { type: "string", name: "term", label: "Term", required: true, ui: { component: "textarea" } },
                          { type: "string", name: "desc", label: "Description", required: true, ui: { component: "textarea" } }
                        ]
                      }
                    ]
                  },
                  {
                    type: "object",
                    name: "right",
                    label: "Right Column",
                    required: true,
                    fields: [
                      { type: "string", name: "icon", label: "Icon" },
                      { type: "string", name: "label", label: "Label", required: true },
                      { type: "string", name: "title", label: "Title", required: true },
                      { type: "string", name: "caption", label: "Caption" },
                      {
                        type: "object",
                        name: "items",
                        label: "Items",
                        list: true,
                        fields: [
                          { type: "string", name: "term", label: "Term", required: true, ui: { component: "textarea" } },
                          { type: "string", name: "desc", label: "Description", required: true, ui: { component: "textarea" } }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: "EvidenceQuote",
                label: "Evidence Quote",
                fields: [
                  {
                    type: "object",
                    name: "items",
                    label: "Items",
                    list: true,
                    fields: [
                      { type: "string", name: "source", label: "Source", required: true },
                      { type: "string", name: "original", label: "Original Quote", ui: { component: "textarea" } },
                      { type: "string", name: "translation", label: "Translation", required: true, ui: { component: "textarea" } }
                    ]
                  }
                ]
              },
              {
                name: "TaggedList",
                label: "Tagged List",
                fields: [
                  {
                    type: "object",
                    name: "items",
                    label: "Items",
                    list: true,
                    fields: [
                      { type: "string", name: "label", label: "Label", required: true, ui: { component: "textarea" } },
                      { type: "string", name: "tag", label: "Tag", required: true },
                      { type: "string", name: "href", label: "URL" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
