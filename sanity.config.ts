import { defineConfig, isDev } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas/index";
import { visionTool } from "@sanity/vision";
const config = defineConfig({
  projectId: "359951dg",
  dataset: "production",
  apiVersion: "2021-10-21",
  title: "Yts",
  basePath: "/admin",

  plugins: isDev ? [deskTool(), visionTool()] : [deskTool()],
  schema: { types: schemas },
});
export default config;
