import { defineConfig } from "cypress";
import { config } from "dotenv"
config();
export default defineConfig({
  env:{
    API_URL: process.env.API_URL
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
