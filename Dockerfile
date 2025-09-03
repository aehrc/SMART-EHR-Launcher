# Dockerfile

# Step 1: Use a Node.js image to build the app with platform set by buildx
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install

# Copy the rest of the app's source code
COPY . .

RUN uname -m > /arch

# Build the app
RUN npm run build


# Step 2: Use an Nginx image to serve the static files
FROM nginx:alpine

# Copy the build files from the builder stage to the Nginx web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy your Nginx configuration file into the container
COPY default.conf /etc/nginx/conf.d/

RUN uname -m > /arch

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]