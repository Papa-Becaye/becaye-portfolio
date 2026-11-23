import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// `npm run build` lance déjà OpenNext : on cible le build Next brut pour éviter
// que la CLI OpenNext ne rappelle `npm run build` en boucle.
config.buildCommand = "npm run build:next";

export default config;
