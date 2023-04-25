# Use an official Node.js runtime as a parent image
FROM node:14-alpine

 # Set the working directory
WORKDIR /app

 # Copy the package.json and package-lock.json files to the container
COPY package*.json ./

 # Install dependencies
RUN npm install

 # Copy the rest of the app's source code to the container
COPY . .

 # Expose the port that the app will run on
EXPOSE 3000

 # Start the app
CMD ["npm", "start"]