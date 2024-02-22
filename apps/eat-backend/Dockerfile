FROM node:latest

RUN yarn set version berry

WORKDIR /app
COPY package.json yarn.lock ./
COPY packages/shared ./packages/shared
COPY apps/eat-back/package.json ./apps/eat-back/package.json
# Create app directory

# Install app dependencies
RUN yarn install

# Copy source files
COPY ./apps/eat-back/ ./apps/eat-back/

WORKDIR /app/apps/eat-back

CMD ["yarn", "dev"]
