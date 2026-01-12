#!/bin/bash

echo "========================================="
echo "pub-site Application Debugging Script"
echo "========================================="

echo ""
echo "1. Checking pub-site namespace:"
kubectl get namespace pub-site 2>/dev/null || echo "Namespace 'pub-site' does not exist"

echo ""
echo "2. All resources in pub-site namespace:"
kubectl get all -n pub-site 2>/dev/null || echo "No resources found or namespace doesn't exist"

echo ""
echo "3. Checking deployments:"
kubectl get deployments -n pub-site -o wide 2>/dev/null

echo ""
echo "4. Checking pods with detailed status:"
kubectl get pods -n pub-site -o wide 2>/dev/null

echo ""
echo "5. Checking pod events:"
kubectl get events -n pub-site --sort-by='.lastTimestamp' 2>/dev/null | tail -20

echo ""
echo "6. Describing pub-site deployment:"
kubectl describe deployment pub-site -n pub-site 2>/dev/null

echo ""
echo "7. Pod logs (if pod exists):"
POD_NAME=$(kubectl get pods -n pub-site -l app=pub-site -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)
if [ -n "$POD_NAME" ]; then
    echo "Pod name: $POD_NAME"
    echo "Container logs:"
    kubectl logs -n pub-site $POD_NAME --tail=50 2>/dev/null || echo "Cannot get logs"
    echo ""
    echo "Describing pod:"
    kubectl describe pod -n pub-site $POD_NAME 2>/dev/null
else
    echo "No pub-site pods found"
fi

echo ""
echo "8. Checking service:"
kubectl get svc -n pub-site 2>/dev/null

echo ""
echo "9. Checking Gateway API resources:"
kubectl get gateway -A 2>/dev/null
kubectl get httproute -A 2>/dev/null

echo ""
echo "10. Describing pub-site Gateway and HTTPRoute:"
kubectl describe gateway pub-site-gateway -n pub-site 2>/dev/null
kubectl describe httproute pub-site -n pub-site 2>/dev/null

echo ""
echo "11. Testing if pod can be reached internally:"
if [ -n "$POD_NAME" ]; then
    POD_IP=$(kubectl get pod $POD_NAME -n pub-site -o jsonpath='{.status.podIP}')
    if [ -n "$POD_IP" ]; then
        echo "Pod IP: $POD_IP"
        echo "Testing connection to pod:80..."
        kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- curl -I http://$POD_IP:80 --max-time 5 2>&1 || echo "Cannot reach pod"
    fi
fi

echo ""
echo "========================================="
echo "Debug complete"
echo "========================================="
