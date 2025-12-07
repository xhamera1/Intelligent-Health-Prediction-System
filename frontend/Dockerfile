FROM node:22-alpine

WORKDIR /app

COPY package.json ./

# Install dependencies
RUN npm install

COPY . .

# Copy source code
COPY src ./src

# Expose port
EXPOSE 5173

# Run dev server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
