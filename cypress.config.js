import { defineConfig } from "cypress";
import { config } from "dotenv"
config();
export default defineConfig({
  env:{
    API_URL: process.env.API_URL,
    TEST_API_URL: process.env.TEST_API_URL
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  //This is to combat flaky tests by allowing it to retry at least 2 times before it's deemed a failure
  //should prevent cases where test works one time but not the other despite nothing having changed
  retries: 2,
});
