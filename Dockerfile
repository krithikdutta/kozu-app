# --- Stage 1: Builder ---
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files first to cache dependencies
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove devDependencies to keep the final image small
RUN npm prune --production

# --- Stage 2: Runner ---
FROM node:22-alpine

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
# Disable connection usage stats
ENV BODY_SIZE_LIMIT=Infinity

# Create a non-root user for security
USER node

# Copy only necessary files from the builder stage
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "build"]