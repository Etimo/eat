FROM node:20-alpine AS base
 
FROM base AS deps

RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo@2.0.3
COPY . .
RUN turbo prune auth --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/yarn.lock ./yarn.lock
RUN yarn install

# # Dev
FROM base AS dev

WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .

# Build the project
FROM installer as builder
WORKDIR /app

COPY --from=deps /app/out/full/ .
RUN yarn turbo run build --filter=auth


FROM builder AS runner
WORKDIR /app 

# # Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify
RUN chown -R fastify:nodejs /app
USER fastify

EXPOSE 3101

ENV PORT 3101

CMD ["node", "apps/auth/dist/src/main.js"]
