# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.16.0

################################################################################

# --- Base image with shared setup ---

# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Copy the package.json so deps can be installed.
COPY package*.json ./

# --- End Base image with shared setup ---

# --- Stages ---

# Development stage
FROM base AS dev
RUN npm install
COPY . .
CMD ["npx", "tsx", "watch", "--env-file=.env", "src/app.ts"] 


# Build stage
FROM base as build
RUN npm install
COPY . .
# compile the code and rewire paths
RUN npx tsc && npx tsc-alias

# Production stage
FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --omit=dev
# Copy only compiled output from the build stage
COPY --from=build /usr/src/app/dist ./dist
# Copy env file here
COPY .env.prod .  
CMD ["node", "--env-file=.env.prod", "./dist/app.js"] 

# --- End Stages ---