import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-axios",
  input: "src/hey-api/swagger.json",
  output: "src/hey-api",
});
