# Build stage
FROM node:23-slim AS builder

RUN yarn set version berry

# Set working directory
WORKDIR /app

# Copy the entire project for proper build context
COPY . .

# Install all dependencies (using npm for simplicity)
RUN cd apps/eat-web && yarn install

# Build the application
RUN cd apps/eat-web && yarn run build

# Production stage
FROM node:23-slim as production

# Set working directory
WORKDIR /app

RUN npm i -g serve
# Copy built files from builder
COPY --from=builder /app/apps/eat-web/dist ./dist

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start application with the correct path
CMD [ "serve", "-s", "dist" ]