# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container to /server
WORKDIR /server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --only=production

# Copy the rest of your application's source code to the working directory
COPY . .

# Expose port 8000 for the application (or whatever port your server runs on)
EXPOSE 8000

# Run the application in production mode
CMD [ "npm", "run", "start:prod" ]
