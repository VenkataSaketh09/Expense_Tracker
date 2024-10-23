import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://account:2Ms6eIUNmHnK@ep-calm-river-a5i08u84.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require",
  }
});