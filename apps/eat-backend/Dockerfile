# Build stage
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy the entire project for proper build context
COPY . .

# Install all dependencies (using npm for simplicity)
RUN cd apps/eat-backend && npm install

# Build the application
RUN cd apps/eat-backend && npm run build

# Production stage
FROM node:20-slim as production

# Set working directory
WORKDIR /app

# Copy package.json
COPY apps/eat-backend/package.json ./

# Copy built files from builder
COPY --from=builder /app/apps/eat-backend/dist ./dist
COPY --from=builder /app/apps/eat-backend/config ./config

# Install only production dependencies
RUN npm install

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3101

# Start application with the correct path
CMD ["node", "dist/src/main.js"]