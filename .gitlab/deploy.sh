#!/bin/bash
set -euo pipefail

# Скрипт деплоя AI Chatbot на сервер
# Использование: ./deploy.sh <IMAGE_TAG> <CONTAINER_NAME> <DEPLOY_FOLDER_NAME> <HARBOR_REGISTRY> <HARBOR_PROJECT> <IMAGE_NAME>

IMAGE_TAG="${1}"
CONTAINER_NAME="${2:-ai-chatbot-backend}"
DEPLOY_FOLDER_NAME="${3:-trading-chatbot-demo}"
HARBOR_REGISTRY="${4:-registry.example.com}"
HARBOR_PROJECT="${5:-devops}"
IMAGE_NAME="${6:-trading-chatbot-demo}"

echo "Pulling new image from Harbor: ${IMAGE_TAG}"
docker pull ${IMAGE_TAG}

echo "Restarting container: ${CONTAINER_NAME}"
docker restart ${CONTAINER_NAME} || {
  echo "Container not running, starting it..."
  cd ~/${DEPLOY_FOLDER_NAME}
  if command -v docker-compose &> /dev/null; then
    docker-compose up -d ai-chatbot
  elif docker compose version &> /dev/null; then
    docker compose up -d ai-chatbot
  else
    echo "Error: docker-compose not found and container not running"
    exit 1
  fi
}

echo "Waiting for container to start..."
sleep 10

# Проверяем статус контейнера
if docker ps --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
  echo "✅ Container ${CONTAINER_NAME} is running successfully"
  echo "Image used: ${IMAGE_TAG}"
  docker logs --tail=30 ${CONTAINER_NAME}
  
  # Удаляем старые неиспользуемые образы ai-chatbot для экономии места
  echo "Cleaning up old unused images..."
  # Удаляем все неиспользуемые образы с именем ai-chatbot (кроме текущего)
  OLD_IMAGES=$(docker images "${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}" --format "{{.ID}}" --filter "dangling=false" | grep -v "$(docker images ${IMAGE_TAG} --format "{{.ID}}" | head -1)" || true)
  if [ -n "$OLD_IMAGES" ]; then
    echo "$OLD_IMAGES" | xargs -r docker rmi -f || true
    echo "✅ Removed old unused images"
  else
    echo "No old images to remove"
  fi
  
  # Также удаляем все dangling (висячие) образы
  docker image prune -f --filter "dangling=true" || true
else
  echo "❌ Container ${CONTAINER_NAME} failed to start"
  echo "Checking logs..."
  docker logs ${CONTAINER_NAME} || true
  exit 1
fi

