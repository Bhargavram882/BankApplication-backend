FROM node:14

WORKDIR /backend
COPY package.json .
RUN npm install
RUN npm install jsonwebtoken --save
COPY . .
CMD npm start
