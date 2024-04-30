FROM node:20-alpine
WORKDIR /app

# Copy necessary files
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the application source code into the container
COPY src/ ./src

# Build the TypeScript files
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/server.js"]
