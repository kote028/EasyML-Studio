# Enterprise Architecture Documentation
## System Context
The NoCodeAI Platform (EasyML-Studio) is an enterprise-grade artificial intelligence abstraction layer. It serves to decouple the rigorous programming syntax of standard Scikit-learn and OpenAI endpoints from the end-user.

## Components
1. **Frontend (Vite + React + Three.js + Framer Motion)**
   - Responsible for rendering Awwwards-style UI, handling WebGL pipelines.
2. **Backend (Python Flask MVC)**
   - API layer capable of horizontal scaling behind a Gunicorn/Nginx reverse proxy.
3. **Data Layer**
   - Transient in-memory mocked Redis cache for current prototype stage.

## CI/CD Pipeline
Maintained via `.github/workflows/main.yml`, ensuring 100% test coverage before remote deployment to AWS ECS or similar container registries.
