# Build stage
FROM node:23-slim AS builder

RUN yarn set version berry

# Set working directory
WORKDIR /app

# Copy the entire project for proper build context
COPY . .

# Install all dependencies (using npm for simplicity)
RUN cd apps/eat-backend && yarn install

# Build the application
RUN cd apps/eat-backend && yarn run build

# Production stage
FROM node:23-slim as production

# Set working directory
WORKDIR /app


COPY --from=builder /app/apps/eat-backend/package.json ./
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.yarn ./.yarn
RUN yarn install
# Copy built files from builder
COPY --from=builder /app/apps/eat-backend/dist ./dist
COPY --from=builder /app/apps/eat-backend/dist/src/migrations ./dist/migrations

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3101

# Start application with the correct path
CMD ["node", "dist/src/main.js"]