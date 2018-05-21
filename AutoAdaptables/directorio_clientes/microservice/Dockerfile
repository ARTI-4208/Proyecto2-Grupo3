FROM node:6.9.2
EXPOSE 3096
COPY package.json .
COPY msdirectoryc.js .
RUN npm install
CMD node msdirectoryc.js