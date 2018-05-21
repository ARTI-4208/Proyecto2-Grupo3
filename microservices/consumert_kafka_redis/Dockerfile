FROM node:6.9.2
EXPOSE 9092
COPY package.json .
COPY kafka_consumert.js .
RUN npm install
CMD node kafka_consumert.js