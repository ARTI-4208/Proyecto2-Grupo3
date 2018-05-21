FROM node:6.9.2
EXPOSE 3022 
COPY package.json .
COPY msquery.js .
RUN npm install
CMD node msquery.js