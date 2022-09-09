#!/bin/sh

set -o errexit

output() {
    echo "\033[1;35m${1}\033[0m"
}

# --

COMMIT=$(git rev-parse HEAD)
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD | sed -E s/[^a-zA-Z0-9]+/-/g | sed -E s/^-+\|-+$//g | tr A-Z a-z)
TAG=$(echo -n "$BRANCH_NAME-$COMMIT" | shasum | awk '{ print $1 }')

# --

echo ""
output "Building container..."

docker build \
  --target=production \
  --file apps/demo/docker/Dockerfile \
  --tag crgeary/alpha-demo:$TAG \
  --output "type=image,push=true" .

# todo: add k8s deployment

echo ""
output "Deployed to container registry"
