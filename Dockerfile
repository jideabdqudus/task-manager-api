# Development stage
FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]