
    FROM node:20-alpine AS builder

    RUN corepack enable && corepack prepare pnpm@latest --activate

    WORKDIR /app


    COPY pnpm-lock.yaml package.json ./


    RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
        pnpm install --frozen-lockfile


    COPY . .
    RUN pnpm run build

    FROM node:20-alpine AS production

    WORKDIR /app

    COPY --from=builder /app/dist ./dist


    USER node


    EXPOSE 5000


    CMD ["npx", "serve", "-s", "dist", "-l", "5000"]
