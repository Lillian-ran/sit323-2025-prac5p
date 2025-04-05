# Dockerized Web Application Deployment Guide

## Environment Setup

### Prerequisites
- **Docker Desktop**: [Windows/macOS](https://www.docker.com/products/docker-desktop/) | [Linux](https://docs.docker.com/engine/install/)

### Installation Verification
docker --version

## Dockerfile Configuration

### File Structure
```dockerfile
# Base image (Node.js LTS + Alpine Linux)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy application code
COPY . .

# Expose application port
EXPOSE 3000

# Startup command
CMD ["node", "app.js"]
```

### Design Rationale
1. **Lightweight Base**: `node:18-alpine` minimizes image size while maintaining full Node.js functionality
2. **Dependency Optimization**: Separate `COPY` for package files enables Docker layer caching
3. **Security**: `--production` flag prevents dev dependencies from being installed
4. **Port Standardization**: Matches Node.js application's listening port

---

### Configuration File (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  webapp:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Service Management
```bash
# Start in detached mode
docker-compose up -d

# View running services
docker-compose ps

# Stop services
docker-compose down
```

---

##  Application Testing

### Endpoint Validation
```bash
# Basic health check
curl http://localhost:3000

# Sample calculation
curl "http://localhost:3000/add?num1=15&num2=23"
# Expected output: {"result":38}
```

### Live Log Monitoring
```bash
docker-compose logs -f webapp
```
