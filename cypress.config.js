import { defineConfig } from "cypress";


export default defineConfig({
  projectId: "undefined",
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,  // Disable video recording if it's not needed
    chromeWebSecurity: false,  // Disable security for testing
  },
});
