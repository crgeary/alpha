#!/bin/sh

output() {
    echo "\033[1;35m${1}\033[0m"
}

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
