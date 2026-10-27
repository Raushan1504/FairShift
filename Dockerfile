# Multi-Stage Production Dockerfile for Google Cloud Run Deployment
# Prompt Wars 2026 - SRM ACM Student Chapter
# Compliant with Google Cloud Run PORT environment variable

# Stage 1: Build the React + Vite static bundle
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with lightweight Node HTTP static server
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=builder /app/dist ./dist
COPY server.js ./

EXPOSE 8080

CMD ["node", "server.js"]
