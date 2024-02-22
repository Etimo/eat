FROM node:latest

RUN yarn set version berry

WORKDIR /app
COPY package.json yarn.lock ./
COPY packages/shared ./packages/shared
COPY apps/eat-backend/package.json ./apps/eat-backend/package.json
# Create app directory

# Install app dependencies
RUN yarn install

# Copy source files
COPY ./apps/eat-backend/ ./apps/eat-backend/

WORKDIR /app/apps/eat-backend

CMD ["yarn", "dev"]
