#!/bin/bash

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
  --tag crgeary/alpha-demo:$TAG .

echo ""
output "Deploying to Minikube..."

NAMESPACE=$(kubectl apply -f apps/demo/k8s/namespace.yaml -o='go-template={{ .metadata.name }}')

echo "namespace set: ${NAMESPACE}"

kubectl rollout pause deployment/demo-deployment -n=$NAMESPACE
kubectl apply -f apps/demo/k8s -n=$NAMESPACE
kubectl rollout resume deployment/demo-deployment -n=$NAMESPACE

kubectl rollout status deployment/demo-deployment -w -n=$NAMESPACE


echo ""
output "Deployed to..."
kubectl get ingress -n=$NAMESPACE
