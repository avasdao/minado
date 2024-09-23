FROM node:18-slim

#ENV HOST='0.0.0.0'
#ENV PORT='3000'

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["node", "/app/server.js"]
