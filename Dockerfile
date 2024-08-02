FROM node:20-alpine

COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 4761
CMD ["npm", "start"]
