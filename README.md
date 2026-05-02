# 🧠 Quizzy — Quiz Web Application

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![SonarCloud](https://img.shields.io/badge/Code%20Quality-SonarCloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)

A full-stack quiz platform built with the **MERN stack**, featuring role-based authentication, quiz management, and real-time score tracking — with a complete **DevOps pipeline** for containerization, CI/CD, and code quality analysis.

[Live Demo](#) · [Docker Hub](https://hub.docker.com/u/harshasurwase) · [Report Bug](https://github.com/Haruu4304/Quiz-App/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [DevOps Implementation](#-devops-implementation)
  - [Lab 4 — Version Control with Git](#lab-4--version-control-with-git)
  - [Lab 2 — Containerization with Docker](#lab-2--containerization-with-docker)
  - [Lab 5 — CI/CD with GitHub Actions](#lab-5--cicd-with-github-actions)
  - [Lab 8 — Code Quality with SonarCloud](#lab-8--code-quality-with-sonarcloud)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)

---

## 🎯 About

Quizzy is a full-stack quiz application that allows **admins** to create and manage quizzes, and **users** to attempt them and track their scores. It uses **JWT-based authentication** for secure role-based access and supports full **CRUD operations** across quizzes, questions, and user attempts.

---

## ✨ Features

### 👨‍💼 Admin
| Feature | Description |
|---|---|
| 🔐 Login | Secure login with JWT, error handling for invalid credentials |
| 📝 Quiz Management | Add, Edit, Delete quizzes with title, description, and timer |
| ❓ Question Management | Add, Edit, Delete multiple-choice questions per quiz |
| 📊 View Scores | View scores of all users or per quiz |
| 📈 Dashboard | Overview of all quizzes, users, and scores |

### 👤 User
| Feature | Description |
|---|---|
| 🔐 Login/Register | Sign up and login with JWT authentication |
| 📋 View Quizzes | Browse all quizzes created by admin |
| 🎯 Attempt Quizzes | Attempt quizzes not previously completed |
| 🏆 View Scores | See score immediately after quiz completion |
| 📜 View Attempts | View history of all previously attempted quizzes |
| 📈 Dashboard | Personal stats and quiz history |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | JSON Web Token (JWT) |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |
| **Code Quality** | SonarCloud |
| **Registry** | Docker Hub |

---

## ⚙️ DevOps Implementation

This project implements a complete DevOps pipeline covering version control, containerization, CI/CD automation, and code quality analysis.

```
Developer writes code
        ↓
git push origin main
        ↓
┌─────────────────────────────────┐
│        GitHub Actions           │
│                                 │
│  Job 1: SonarCloud Code Scan   │
│          ↓ (passes)             │
│  Job 2: Docker Build & Push    │
└─────────────────────────────────┘
        ↓
Docker Hub (harshasurwase)
  ├── quiz-server:latest
  └── quiz-client:latest
```

---

### Lab 4 — Version Control with Git

The project is version controlled using **Git** and hosted on **GitHub**.

```bash
# Repository
https://github.com/Haruu4304/Quiz-App

# Branch strategy
main → production-ready code
```

**What was done:**
- Full Git history with meaningful commit messages
- `.gitignore` configured to exclude `node_modules`, `.env`, `build/dist` folders
- All DevOps config files tracked in the repository

---

### Lab 2 — Containerization with Docker

Both the client and server are containerized using **Docker** and orchestrated with **Docker Compose**.

#### Server Dockerfile (`server/Dockerfile`)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
```

#### Client Dockerfile (`client/Dockerfile`)
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
> Multi-stage build used for the client — keeps the final image small by only shipping the built static files via Nginx.

#### Docker Compose (`docker-compose.yml`)
```yaml
version: "3.8"
services:
  server:
    build: ./server
    ports:
      - "4000:4000"
    env_file:
      - ./server/.env
    restart: unless-stopped

  client:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - server
    restart: unless-stopped
```

#### Docker Hub
Both images are publicly available on Docker Hub:

```bash
# Pull images
docker pull harshasurwase/quiz-server:latest
docker pull harshasurwase/quiz-client:latest

# Run locally
docker compose up
```

| Image | Link |
|---|---|
| `harshasurwase/quiz-server` | [Docker Hub](https://hub.docker.com/r/harshasurwase/quiz-server) |
| `harshasurwase/quiz-client` | [Docker Hub](https://hub.docker.com/r/harshasurwase/quiz-client) |

---

### Lab 5 — CI/CD with GitHub Actions

A fully automated CI/CD pipeline is configured using **GitHub Actions** at `.github/workflows/deploy.yml`.

#### Pipeline Trigger
```
Every git push to main branch → pipeline runs automatically
```

#### Pipeline Jobs

**Job 1 — Code Quality Check (SonarCloud)**
- Scans all source code for bugs, vulnerabilities, and code smells
- Must pass before Docker build begins (`needs: code-quality`)

**Job 2 — Build & Push Docker Images**
- Builds fresh Docker images for both client and server
- Pushes updated images to Docker Hub automatically
- Uses GitHub Secrets for secure credential management

#### GitHub Secrets Used
| Secret | Purpose |
|---|---|
| `DOCKER_USERNAME` | Docker Hub login |
| `DOCKER_PASSWORD` | Docker Hub access token |
| `SONAR_TOKEN` | SonarCloud authentication |
| `GITHUB_TOKEN` | Auto-provided by GitHub Actions |

#### Full Pipeline (`.github/workflows/deploy.yml`)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  build-and-push:
    runs-on: ubuntu-latest
    needs: code-quality
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - name: Build and Push SERVER
        uses: docker/build-push-action@v5
        with:
          context: ./server
          push: true
          tags: harshasurwase/quiz-server:latest
      - name: Build and Push CLIENT
        uses: docker/build-push-action@v5
        with:
          context: ./client
          push: true
          tags: harshasurwase/quiz-client:latest
```

---

### Lab 8 — Code Quality with SonarCloud

**SonarCloud** is integrated to automatically analyze code quality on every push.

#### Configuration (`sonar-project.properties`)
```properties
sonar.projectKey=Haruu4304_Quiz-App
sonar.organization=haruu4304
sonar.sources=.
sonar.exclusions=**/node_modules/**,**/build/**,**/dist/**,.github/**
```

#### Current Analysis Results
| Metric | Result | Grade |
|---|---|---|
| Security | 4 open issues | E |
| Reliability | 83 open issues | C |
| Maintainability | 114 open issues | A |
| Duplications | 3.3% | — |
| Lines of Code | 2.5k | — |

> 📌 SonarCloud Dashboard: [sonarcloud.io → Quiz-App](https://sonarcloud.io/project/overview?id=Haruu4304_Quiz-App)

---

## 🏁 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Docker (optional)

### 1. Clone the repository

```bash
git clone https://github.com/Haruu4304/Quiz-App.git
cd Quiz-App
```

### 2. Setup Server

```bash
cd server
npm install
```

### 3. Setup Client

```bash
cd ../client
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=4000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## ▶️ Running Locally

```bash
# Start backend (from server/)
npm run dev

# Start frontend (from client/)
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:4000 |

---

## 📡 API Reference

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and get JWT token |

### Admin Routes
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/quizzes` | Get all quizzes |
| `POST` | `/api/v1/admin/quizzes` | Create a new quiz |
| `PUT` | `/api/v1/admin/quizzes/:id` | Update a quiz |
| `DELETE` | `/api/v1/admin/quizzes/:id` | Delete a quiz |
| `GET` | `/api/v1/admin/quizzes/:id/questions` | Get questions for a quiz |
| `POST` | `/api/v1/admin/quizzes/:id/questions` | Add question to quiz |
| `PUT` | `/api/v1/admin/questions/:id` | Update a question |
| `DELETE` | `/api/v1/admin/questions/:id` | Delete a question |
| `GET` | `/api/v1/admin/scores` | Get all user scores |

### User Routes
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/quizzes` | Get all available quizzes |
| `POST` | `/api/v1/quizzes/:id/attempt` | Attempt a quiz |
| `GET` | `/api/v1/users/:id/attempts` | Get all attempts for a user |

---

## 📁 Project Structure

```
Quiz-App/
├── client/                         # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── Dockerfile                  # Multi-stage Docker build
│   ├── .dockerignore
│   └── package.json
│
├── server/                         # Node.js + Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── Dockerfile                  # Production Docker build
│   ├── .dockerignore
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD pipeline
│
├── docker-compose.yml              # Multi-container orchestration
├── sonar-project.properties        # SonarCloud configuration
└── README.md
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Haruu4304">Harsha Surwase</a>
</div>