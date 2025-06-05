FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Optionally write env vars into a file (for NestJS config service to read)
# Or you can use ENV in your code directly via process.env.X
ARG DATABASE_URL
ARG JWT_SECRET

ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
