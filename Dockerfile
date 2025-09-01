# Dockerfile

# Step 1: Use a Node.js image to build the app with platform set by buildx
FROM --platform=${TARGETPLATFORM:-linux/amd64} node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Set npm config for better compatibility using environment variable
ENV NPM_CONFIG_UNSAFE_PERM=true
ENV NODE_OPTIONS=--max_old_space_size=4096

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN npm run build


# Step 2: Use an Nginx image to serve the static files
FROM --platform=${TARGETPLATFORM:-linux/amd64} nginx:alpine

# Copy the build files from the builder stage to the Nginx web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy your Nginx configuration file into the container
COPY default.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]