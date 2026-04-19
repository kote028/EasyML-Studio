# 🚀 EasyML-Studio
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![Flask](https://img.shields.io/badge/Backend-Python%20Flask-3776AB)
![MachineLearning](https://img.shields.io/badge/AI-Scikit--learn-F7931E)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)

**EasyML-Studio** is an enterprise-grade, Awwwards-inspired platform that allows students and developers to interact with advanced Artificial Intelligence, Machine Learning algorithms, and Large Language Models (LLMs) **without writing a single line of code**.

Built with an ultra-premium brutalist UI leveraging smooth scrolling, immersive WebGL, and interactive Plotly.js visualizations.

---

## 📖 Table of Contents
- [The Vision](#-the-vision)
- [Enterprise Architecture](#-enterprise-architecture)
- [Key Features](#-key-features)
- [Quick Start Guide](#-quick-start-guide)
- [Docker Deployment](#-docker-deployment)
- [Tech Stack](#-tech-stack)

---

## 🌟 The Vision
Machine learning can be intimidating due to complex libraries and programming requirements. 

**EasyML-Studio** acts as an abstraction layer. It empowers users to drop in raw data, click a button, and immediately visualize how neural networks, classification models, or LLMs interpret that data. It simplifies *Scikit-learn, Pandas,* and *OpenAI* down to a gorgeous UI.

---

## 🏢 Enterprise Architecture
This project is engineered to scale, separating concerns between a robust Data API and an interactive Client Interface.

### 1. The Global AI Assistant
A built-in interactive Chatbot floats on all screens globally, acting as a beginner-friendly data tutor. Ask it what model to use for continuous data, and it will guide you.

### 2. Smart Target Selection
Uploading Data (CSV) parses all feature columns dynamically into global memory. When transitioning to the AI Studio, the application allows users to selectively configure exactly what the AI should act upon.

---

## ✨ Key Features

| Module | Description |
|--------|-------------|
| **Immersive UI/UX** | Brutalist Awwwards-style typography, `Lenis` smooth scrolling lockups, and `react-three-fiber` geometry generation. |
| **Data Preprocessing** | Direct CSV drag-and-drop parsing, automatic visual data head generation, and toggles for Dropping NaNs & Normalization. |
| **ML Studio Configuration** | Pick from Classification (buckets), Regression (continuous), or Clustering (unlabeled grouping) using your specific dataset. |
| **Interactive Plotly Maps** | Once an AI finishes training, the results render as highly interactive 2D boundaries, Linear Fit Lines, or fully 3D interactive Clustering cubes. |
| **LLM Playground** | Test the logic of Large Language Models via Sentiment Analysis, Question-Answering, and Data summarization endpoints. |

---

## 🚀 Quick Start Guide
Run the system natively using your local development environment.

### 1. Start the Flask Backend (Terminal 1)
```bash
cd backend
python -m venv venv           # Optional: Create virtual environment
source venv/bin/activate      # Optional: Activate (Mac/Linux) or venv\Scripts\activate (Windows)
pip install -r requirements.txt
python app.py
```
*API will spin up on `http://localhost:5000`*

### 2. Start the React Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
*UI will compile with Vite and open at `http://localhost:5173`*

---

## 🐳 Docker Deployment
For production testing, the entire architecture is heavily containerized. 

Ensure you have Docker Desktop running, then at the root of the repository, execute:
```bash
docker-compose up --build -d
```
This spins up the Nginx front-facing container, Flask API container, and associated networks.

---

## 💻 Tech Stack
- **Frontend Core**: React 18, Vite, Tailwind CSS
- **Visual Engineering**: Framer Motion, Lenis (Smooth Scroll), Three.js (React Three Fiber), Plotly.js
- **Backend Architecture**: Python 3.10+, Flask MVC Blueprint
- **Machine Learning**: Scikit-Learn, Pandas, Numpy
- **DevOps**: GitHub Actions (CI/CD), Docker Compose, PyTest
