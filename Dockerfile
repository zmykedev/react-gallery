# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built output from builder
# Nitro with TanStack Start generates .output directory
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the application
# Nitro server entry point
CMD ["node", ".output/server/index.mjs"]

