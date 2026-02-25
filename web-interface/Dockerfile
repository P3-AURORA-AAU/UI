FROM node:22-alpine

# Set working directory
WORKDIR /web-interface

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies (no extra junk)
RUN npm install

# Copy the rest of the app
COPY . .

# Expose if your dev server needs it (optional)
# EXPOSE 3000

CMD ["npm", "run", "dev"]

