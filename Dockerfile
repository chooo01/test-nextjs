# FROM node:20-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .

# RUN npx prisma generate
# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "start"]


FROM node:lts-alpine3.17

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]