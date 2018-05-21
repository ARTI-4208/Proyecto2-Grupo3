FROM node:6.9.2
EXPOSE 1883
COPY package.json .
COPY bridge_kafka_mosquitto.js .
RUN npm install
CMD node bridge_kafka_mosquitto.js