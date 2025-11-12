#!/bin/bash
set -e

echo "========================================="
echo "ArgoCD Installation Script (Optimized for t2.micro)"
echo "========================================="

# Add swap space to prevent OOM on low-memory instances
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
echo "Installing ArgoCD (using core install for reduced resource usage)..."
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/core-install.yaml

echo ""
echo "Reducing ArgoCD resource requests for low-memory environment..."
# Patch resource limits for application-controller
kubectl patch deployment argocd-application-controller -n argocd --type='json' \
  -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources/requests/memory", "value":"128Mi"}]' || true

# Patch resource limits for repo-server
kubectl patch deployment argocd-repo-server -n argocd --type='json' \
  -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/resources/requests/memory", "value":"64Mi"}]' || true

echo ""
echo "Installing ArgoCD Server (UI) as single replica..."
kubectl apply -n argocd -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: argocd-server
  namespace: argocd
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: argocd-server
  template:
    metadata:
      labels:
        app.kubernetes.io/name: argocd-server
    spec:
      serviceAccountName: argocd-server
      containers:
      - name: argocd-server
        image: quay.io/argoproj/argocd:latest
        command:
        - argocd-server
        ports:
        - containerPort: 8080
        - containerPort: 8083
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: argocd-server
  namespace: argocd
spec:
  type: NodePort
  selector:
    app.kubernetes.io/name: argocd-server
  ports:
  - name: http
    port: 80
    targetPort: 8080
  - name: https
    port: 443
    targetPort: 8080
EOF

echo ""
echo "Waiting for ArgoCD to be ready (this may take a few minutes)..."
echo "Monitoring pod startup..."
kubectl get pods -n argocd -w &
WATCH_PID=$!

# Wait with longer timeout for low-resource environment
sleep 30
kubectl wait --for=condition=Ready pods -l app.kubernetes.io/name=argocd-application-controller -n argocd --timeout=300s || echo "Controller timeout - checking status..."
kubectl wait --for=condition=Ready pods -l app.kubernetes.io/name=argocd-repo-server -n argocd --timeout=300s || echo "Repo server timeout - checking status..."
kubectl wait --for=condition=Ready pods -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s || echo "Server timeout - checking status..."

kill $WATCH_PID 2>/dev/null || true

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
