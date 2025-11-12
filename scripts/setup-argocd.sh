#!/bin/bash
set -e

echo "========================================="
echo "ArgoCD Installation Script"
echo "========================================="

echo "Creating argocd namespace..."
kubectl create namespace argocd || echo "Namespace argocd already exists"

echo "Installing ArgoCD..."
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo "Waiting for ArgoCD to be ready (this may take a few minutes)..."
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s

echo "Configuring ArgoCD server service as NodePort..."
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'

NODEPORT=$(kubectl get svc argocd-server -n argocd -o jsonpath='{.spec.ports[?(@.name=="http")].nodePort}')
HTTPS_NODEPORT=$(kubectl get svc argocd-server -n argocd -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')

echo ""
echo "Getting ArgoCD initial admin password..."
ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)

echo ""
echo "========================================="
echo "ArgoCD Installation Complete!"
echo "========================================="
echo ""
echo "ArgoCD Server Access:"
echo "  HTTP NodePort:  $NODEPORT"
echo "  HTTPS NodePort: $HTTPS_NODEPORT"
echo ""
echo "Access ArgoCD at:"
echo "  http://<EC2_PUBLIC_IP>:$NODEPORT"
echo "  https://<EC2_PUBLIC_IP>:$HTTPS_NODEPORT"
echo ""
echo "Login Credentials:"
echo "  Username: admin"
echo "  Password: $ARGOCD_PASSWORD"
echo ""
echo "ArgoCD Pods:"
kubectl get pods -n argocd
echo ""
echo "========================================="
echo "IMPORTANT: Save your admin password!"
echo "Password: $ARGOCD_PASSWORD"
echo "========================================="
echo ""
echo "Next Steps:"
echo "1. Access ArgoCD UI via the URL above"
echo "2. Configure your pub-site application in ArgoCD"
echo "3. Update EC2 Security Group to allow NodePort access"
echo "========================================="

echo ""
read -p "Do you want to install ArgoCD CLI? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Installing ArgoCD CLI..."
    curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
    sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
    rm argocd-linux-amd64
    echo "ArgoCD CLI installed successfully!"
    echo "Usage: argocd version"
fi
