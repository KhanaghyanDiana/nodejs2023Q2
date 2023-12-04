FROM node:16.13.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 1115
CMD ["npm" ,"run", "start:dev"]