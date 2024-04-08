# Use the official Node.js image as the base image
FROM node:lts-alpine3.18 as builder

# Set the working directory
WORKDIR /server

# Copy files from your computer into the image
COPY . .

# Install the dependencies
RUN npm install

# Indicates that the container will listen on port 3000
EXPOSE 4000

# Specifies what command to run within the container
CMD ["npm", "run", "start"]
