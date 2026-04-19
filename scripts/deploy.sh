#!/bin/bash
# Enterprise staging deployment script
echo "Starting Enterprise Deployment..."

echo "1. Checking Docker configurations"
docker-compose config -q || { echo "Docker compose validation failed"; exit 1; }

echo "2. Building frontend artifacts"
cd frontend && npm install && npm run build
cd ..

echo "3. Tearing down existing containers"
docker-compose down

echo "4. Spinning up production network"
docker-compose up -d --build

echo "Deployment Successful! System online."
