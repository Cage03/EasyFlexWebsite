ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION}-slim AS base

ARG PORT=3000

WORKDIR /src

# Build
FROM base AS build

COPY --link package.json package-lock.json .
RUN npm ci

COPY --link . .

RUN npm run build

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

# To define what API it must use use NUXT_PUBLIC_API_URL="your-api-url" Environment variable which follows the structure based on the one in nuxt.config.json

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]