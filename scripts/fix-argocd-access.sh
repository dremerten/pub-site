#!/bin/bash

echo "========================================="
echo "ArgoCD Access Fix Script"
echo "========================================="

echo ""
echo "Option 1: Using kubectl port-forward (recommended for testing)"
echo "This creates a tunnel from your local machine to ArgoCD"
echo ""
echo "Run this command on your LOCAL machine (not EC2):"
echo "  ssh -L 8080:localhost:8080 ubuntu@<EC2_IP> 'kubectl port-forward svc/argocd-server -n argocd 8080:80'"
echo ""
echo "Then access ArgoCD at: http://localhost:8080"
echo ""

echo "Option 2: Fix ArgoCD NodePort Service"
echo ""
read -p "Do you want to recreate the ArgoCD server service with proper NodePort? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Deleting existing argocd-server service..."
    kubectl delete svc argocd-server -n argocd 2>/dev/null || true

    echo "Creating new NodePort service..."
    kubectl apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: argocd-server
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-server
spec:
  type: NodePort
  selector:
    app.kubernetes.io/name: argocd-server
  ports:
  - name: http
    port: 80
    targetPort: 8080
    protocol: TCP
    nodePort: 30080
  - name: https
    port: 443
    targetPort: 8080
    protocol: TCP
    nodePort: 30443
EOF

    echo ""
    echo "Service recreated with fixed NodePorts:"
    echo "  HTTP:  30080"
    echo "  HTTPS: 30443"
    echo ""
    echo "Access ArgoCD at:"
    echo "  http://<EC2_PUBLIC_IP>:30080"
    echo "  http://<EC2_PUBLIC_IP>:30443"
    echo ""
    echo "Make sure EC2 Security Group allows:"
    echo "  - Port 30080 (HTTP)"
    echo "  - Port 30443 (HTTPS)"
    echo ""
fi

echo ""
echo "Option 3: Disable firewall if enabled"
echo ""
read -p "Do you want to check/disable UFW firewall? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Current UFW status:"
    sudo ufw status

    read -p "Do you want to disable UFW? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo ufw disable
        echo "UFW disabled"
    fi
fi

echo ""
echo "Getting ArgoCD admin password:"
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" 2>/dev/null | base64 -d
echo ""
echo ""
echo "Username: admin"
echo ""
