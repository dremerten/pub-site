## Overview

A modern React-based portfolio site showcasing professional information, projects, and background.

## Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS + styled-components
- **UI Components**: Radix UI, Lucide React
- **Containerization**: Docker (multi-stage build)
- **Web Server**: Nginx (Alpine)
- **Orchestration**: Kubernetes

## Deployment

The site is deployed to Kubernetes with automated CI/CD via GitHub Actions.

### Production
- **Environment**: `pub-site-prod` namespace
- **Trigger**: Push to `main` branch

### Testing
- **Environment**: `pub-site-dev` namespace
- **Trigger**: Pull request to `main` branch
```

## CI/CD Pipeline

The GitHub Actions workflow automatically:
1. Builds and tests the Docker image
2. Runs security scans with Trivy
3. Pushes to Docker Hub
4. Deploys to appropriate Kubernetes environment
5. Comments on PRs with preview URL

## Project Structure

```
.
├── src/                 # React source code
├── public/              # Static assets
├── k8s/                 # Kubernetes manifests
│   ├── production.yaml  # Production deployment
│   ├── testing.yaml     # Testing deployment
│   └── deploy.sh        # Manual deployment script
├── .github/workflows/   # CI/CD workflows
├── Dockerfile           # Multi-stage Docker build
└── nginx-container.conf # Nginx configuration
```

