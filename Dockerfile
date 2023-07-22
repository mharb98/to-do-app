FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
RUN npm ci @prisma/client

COPY prisma ./prisma/

RUN npx prisma generate 

COPY . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force


FROM node:18-alpine as production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD [  "npm", "run", "start:migrate:prod" ]