#!/bin/bash
set -e

echo "========================================="
echo "k3s Installation Script with NGINX Ingress"
echo "========================================="

# Update system
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install k3s with Traefik disabled
echo "Installing k3s (without Traefik)..."
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik" sh -

# Wait for k3s to be ready
echo "Waiting for k3s to be ready..."
sleep 10

# Set up kubeconfig for current user
echo "Setting up kubeconfig..."
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
chmod 600 ~/.kube/config

# Also set KUBECONFIG environment variable
export KUBECONFIG=~/.kube/config
echo "export KUBECONFIG=~/.kube/config" >> ~/.bashrc

# Install kubectl alias
echo "alias k=kubectl" >> ~/.bashrc

# Wait for node to be ready
echo "Waiting for node to be ready..."
kubectl wait --for=condition=Ready nodes --all --timeout=60s

# Install NGINX Ingress Controller
echo "Installing NGINX Ingress Controller..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml

# Wait for NGINX Ingress Controller to be ready
echo "Waiting for NGINX Ingress Controller to be ready..."
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s

# Show cluster info
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
