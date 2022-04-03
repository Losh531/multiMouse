FROM node:16.7.0
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
CMD [ "npm", "start" ]