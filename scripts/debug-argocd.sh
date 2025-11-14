#!/bin/bash

echo "========================================="
echo "ArgoCD Debugging Script"
echo "========================================="

echo ""
echo "1. Checking ArgoCD namespace and pods:"
kubectl get pods -n argocd -o wide

echo ""
echo "2. Checking ArgoCD services and NodePorts:"
kubectl get svc -n argocd

echo ""
echo "3. ArgoCD Server Service Details:"
kubectl describe svc argocd-server -n argocd

echo ""
echo "4. Getting ArgoCD Server NodePort:"
NODEPORT=$(kubectl get svc argocd-server -n argocd -o jsonpath='{.spec.ports[?(@.name=="http")].nodePort}')
HTTPS_NODEPORT=$(kubectl get svc argocd-server -n argocd -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')

if [ -z "$NODEPORT" ]; then
    echo "WARNING: HTTP NodePort not found!"
else
    echo "HTTP NodePort: $NODEPORT"
fi

if [ -z "$HTTPS_NODEPORT" ]; then
    echo "WARNING: HTTPS NodePort not found!"
else
    echo "HTTPS NodePort: $HTTPS_NODEPORT"
fi

echo ""
echo "5. Checking if ArgoCD server pod is running:"
kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server

echo ""
echo "6. ArgoCD server pod logs (last 20 lines):"
POD_NAME=$(kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o jsonpath='{.items[0].metadata.name}')
if [ -n "$POD_NAME" ]; then
    kubectl logs -n argocd $POD_NAME --tail=20
else
    echo "No argocd-server pod found!"
fi

echo ""
echo "7. Checking local firewall (ufw) status:"
sudo ufw status

echo ""
echo "8. Checking if ports are listening:"
if [ -n "$NODEPORT" ]; then
    sudo netstat -tuln | grep ":$NODEPORT" || echo "Port $NODEPORT not listening"
fi

echo ""
echo "9. Testing local connection to ArgoCD:"
if [ -n "$NODEPORT" ]; then
    curl -I http://localhost:$NODEPORT 2>&1 | head -5 || echo "Cannot connect locally"
fi

echo ""
echo "10. Getting admin password:"
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" 2>/dev/null | base64 -d
echo ""

echo ""
echo "========================================="
echo "Access URLs (replace <EC2_IP> with your public IP):"
if [ -n "$NODEPORT" ]; then
    echo "  HTTP:  http://<EC2_IP>:$NODEPORT"
fi
if [ -n "$HTTPS_NODEPORT" ]; then
    echo "  HTTPS: http://<EC2_IP>:$HTTPS_NODEPORT"
fi
echo "========================================="
