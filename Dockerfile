FROM node:16 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm i --force
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]
