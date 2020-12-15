FROM node:14-alpine

COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 4761
CMD ["node", "."]