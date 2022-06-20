FROM node:alpine

WORKDIR /server


COPY ./package*.json ./yarn.lock ./

# Run yarn without generating a yarn.lock file
RUN yarn install

# Bundle app source
ADD ./src ./src
ADD ./tsconfig.json ./tsconfig.json


# Use the port used by our server.js configuration
EXPOSE 6000
CMD ["yarn", "start"]