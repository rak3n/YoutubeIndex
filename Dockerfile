FROM node:12.21

# Create app directory
WORKDIR /usr/src/app

#copy the json
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#Set this as in .env file / where the server port is defined
EXPOSE 8080
CMD [ "node", "index.js" ]