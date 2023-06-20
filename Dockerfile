# ---- Base Node ----
FROM node:16 AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm install

# ---- Copy Files/Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

# --- Release ----
FROM node:16-alpine AS release
WORKDIR /app
COPY --from=dependencies /app/package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD ["npm", "start"]
EXPOSE 3000
