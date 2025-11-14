#!/bin/bash
set -e

echo "========================================="
echo "k3s Installation Script with NGINX Ingress"
echo "========================================="

echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

echo "Installing k3s (without Traefik)..."
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik" sh -

echo "Waiting for k3s to be ready..."
sleep 10

echo "Setting up kubeconfig..."
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
chmod 600 ~/.kube/config

export KUBECONFIG=~/.kube/config
echo "export KUBECONFIG=~/.kube/config" >> ~/.bashrc

echo "alias k=kubectl" >> ~/.bashrc

echo "Waiting for node to be ready..."
kubectl wait --for=condition=Ready nodes --all --timeout=60s

echo "Installing NGINX Ingress Controller..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml

echo "Waiting for NGINX Ingress Controller to be ready..."
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s

echo ""
echo "========================================="
echo "k3s Installation Complete!"
echo "========================================="
echo ""
kubectl cluster-info
echo ""
echo "Nodes:"
kubectl get nodes -o wide
echo ""
echo "NGINX Ingress Controller Pods:"
kubectl get pods -n ingress-nginx
echo ""
echo "========================================="
echo "Next Steps:"
echo "1. Run: source ~/.bashrc (to load kubectl alias)"
echo "2. Run: ./scripts/setup-argocd.sh (to install ArgoCD)"
echo "========================================="
