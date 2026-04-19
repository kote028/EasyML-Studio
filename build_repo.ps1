# Initialize Git repository
git init

# Setup branch
git branch -M main

# Commit 1
git add README.md .gitignore
git commit -m "Initial commit: Set up repository structure and README"

# Commit 2
git add backend/requirements.txt
git commit -m "Add backend project dependencies"

# Commit 3
git add backend/app.py backend/app_routes/__init__.py
git commit -m "Setup basic Flask server and configuration"

# Commit 4
git add backend/app_routes/data.py
git commit -m "Implement dataset upload and preprocessing logic"

# Commit 5
git add backend/app_routes/models.py
git commit -m "Add Scikit-learn endpoints for model training"

# Commit 6
git add backend/app_routes/llm.py
git commit -m "Integrate OpenAI routes for LLM playgrounds"

# Commit 7
git add frontend/package.json frontend/vite.config.js frontend/index.html frontend/postcss.config.js frontend/tailwind.config.js
git commit -m "Initialize React frontend and project config"

# Commit 8
git add frontend/src/index.css
git commit -m "Add base styles and aesthetic configuration"

# Commit 9
git add frontend/src/main.jsx frontend/src/App.jsx
git commit -m "Create core React components and routing structure"

# Commit 10
git add frontend/src/components/Hero3D.jsx
git commit -m "Build 3D Hero section with react-three-fiber"

# Commit 11
git add frontend/src/components/DataUpload.jsx
git commit -m "Implement dataset integration and File Upload UI"

# Commit 12
git add frontend/src/components/Modeling.jsx frontend/src/components/LLMPlayground.jsx
git commit -m "Create ML modeling dashboard and LLM Tools interface"

# Commit 13
git add frontend/src/api.js
git commit -m "Connect API to frontend and finalize platform"

# Push to Github
git remote add origin https://github.com/kote028/EasyML-Studio.git
git push -u origin main --force
