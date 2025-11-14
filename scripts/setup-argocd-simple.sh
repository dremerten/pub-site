#!/bin/bash
set -e

echo "========================================="
echo "ArgoCD Simple Installation (Optimized for t2.micro)"
echo "========================================="

# Add swap space to prevent OOM
echo "Setting up swap space (2GB) to prevent OOM..."
if [ ! -f /swapfile ]; then
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    echo "Swap space created successfully"
else
    echo "Swap file already exists"
fi

echo ""
echo "Current memory status:"
free -h

echo ""
echo "Creating argocd namespace..."
kubectl create namespace argocd || echo "Namespace argocd already exists"

echo ""
echo "Installing ArgoCD (standard HA install)..."
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo ""
echo "Waiting for deployments to be created..."
sleep 10

echo ""
echo "Scaling down to single replicas for low-memory environment..."
kubectl scale deployment argocd-server --replicas=1 -n argocd
kubectl scale deployment argocd-repo-server --replicas=1 -n argocd
kubectl scale deployment argocd-redis --replicas=1 -n argocd
kubectl scale deployment argocd-dex-server --replicas=0 -n argocd

echo ""
echo "Reducing resource requests..."
kubectl set resources deployment argocd-server -n argocd \
  --requests=memory=64Mi,cpu=50m \
  --limits=memory=256Mi,cpu=200m

kubectl set resources deployment argocd-repo-server -n argocd \
  --requests=memory=64Mi,cpu=50m \
  --limits=memory=256Mi,cpu=200m

kubectl set resources deployment argocd-application-controller -n argocd \
  --requests=memory=128Mi,cpu=100m \
  --limits=memory=512Mi,cpu=500m

kubectl set resources deployment argocd-redis -n argocd \
  --requests=memory=32Mi,cpu=25m \
  --limits=memory=128Mi,cpu=100m

echo ""
echo "Patching ArgoCD server service to NodePort with fixed ports..."
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort", "ports": [{"name": "http", "port": 80, "targetPort": 8080, "nodePort": 30080, "protocol": "TCP"}, {"name": "https", "port": 443, "targetPort": 8080, "nodePort": 30443, "protocol": "TCP"}]}}'

echo ""
echo "Waiting for ArgoCD pods to be ready (this may take a few minutes)..."
echo "Monitoring startup progress..."

# Wait for critical components
for deployment in argocd-server argocd-repo-server argocd-application-controller argocd-redis; do
    echo "Waiting for $deployment..."
    kubectl rollout status deployment/$deployment -n argocd --timeout=300s || echo "$deployment timeout - may still be starting"
done

echo ""
echo "Current pod status:"
kubectl get pods -n argocd

echo ""
echo "Getting ArgoCD admin password..."
sleep 5
ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" 2>/dev/null | base64 -d)

echo ""
echo "========================================="
echo "ArgoCD Installation Complete!"
echo "========================================="
echo ""
echo "Access ArgoCD at:"
echo "  HTTP:  http://<EC2_PUBLIC_IP>:30080"
echo "  HTTPS: https://<EC2_PUBLIC_IP>:30443"
echo ""
echo "Login Credentials:"
echo "  Username: admin"
echo "  Password: $ARGOCD_PASSWORD"
echo ""
echo "IMPORTANT: Save your admin password!"
echo "========================================="
echo ""
echo "Security Group Requirements:"
echo "  - Allow TCP port 30080 (HTTP)"
echo "  - Allow TCP port 30443 (HTTPS)"
echo ""
echo "Verify pods are running:"
echo "  kubectl get pods -n argocd"
echo ""
echo "Check service:"
echo "  kubectl get svc argocd-server -n argocd"
echo "========================================="
