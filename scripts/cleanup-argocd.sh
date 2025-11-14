#!/bin/bash

echo "========================================="
echo "ArgoCD Cleanup Script"
echo "========================================="

echo ""
echo "This will remove ArgoCD completely from your cluster."
read -p "Are you sure you want to continue? (y/n) " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleanup cancelled."
    exit 0
fi

echo ""
echo "Deleting ArgoCD namespace and all resources..."
kubectl delete namespace argocd --timeout=60s

echo ""
echo "Checking if namespace is deleted..."
kubectl get namespace argocd 2>/dev/null || echo "ArgoCD namespace successfully deleted"

echo ""
echo "========================================="
echo "ArgoCD Cleanup Complete!"
echo "========================================="
echo ""
echo "You can now run a fresh installation:"
echo "  ./scripts/setup-argocd-simple.sh"
echo "========================================="
