FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Set build-time environment variables for Payload CMS
ARG APP_ENV
ARG AUTH_TOKEN 
ARG BLOB_READ_WRITE_TOKEN
ARG CLOUDFLARE_TURNSTILE_SECRET_KEY
ARG DATABASE_URI
ARG FRESHDESK_API_KEY
ARG FRESHDESK_API_URL
ARG NEXT_PUBLIC_APP_ENV
ARG NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_ENABLED
ARG NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
ARG PAYLOAD_SECRET

ENV APP_ENV=${APP_ENV}
ENV AUTH_TOKEN=${AUTH_TOKEN}
ENV BLOB_READ_WRITE_TOKEN=${BLOB_READ_WRITE_TOKEN}
ENV CLOUDFLARE_TURNSTILE_SECRET_KEY=${CLOUDFLARE_TURNSTILE_SECRET_KEY}
ENV DATABASE_URI=${DATABASE_URI}
ENV FRESHDESK_API_KEY=${FRESHDESK_API_KEY}
ENV FRESHDESK_API_URL=${FRESHDESK_API_URL}
ENV NEXT_PUBLIC_APP_ENV=${NEXT_PUBLIC_APP_ENV}
ENV NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_ENABLED=${NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_ENABLED}
ENV NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}

# Generate Payload types
RUN PAYLOAD_CONFIG_PATH=src/payload.config.ts pnpm run generate:types

# Build Next.js application
RUN pnpm run build

# Remove dev dependencies for production
RUN pnpm prune --prod

# Remove build files that aren't needed in production
RUN rm -rf src .turbo

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["pnpm", "start"]
