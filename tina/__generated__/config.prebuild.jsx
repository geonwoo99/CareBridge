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
        ui: {
          // 이 설정이 있어야 TinaCMS가 iframe 미리보기를 띄우고 좌우 분할 모드(Visual Editing)로 진입합니다.
          router: ({ document }) => {
            return `/guides/${document._sys.filename}`;
          }
        },
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
