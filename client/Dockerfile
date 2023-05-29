# Set the base image to Node
FROM node:18

# Set working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all other source code to work directory
COPY . /app

# Start the application
CMD ["npm", "run", "build"]

# Expose the port
EXPOSE 3000
