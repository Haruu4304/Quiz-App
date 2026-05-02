# 🧠 Quizzy — Quiz Web Application

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![SonarCloud](https://img.shields.io/badge/Code%20Quality-SonarCloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)

A full-stack quiz platform built with the **MERN stack**, featuring role-based authentication, quiz management, and real-time score tracking.

[Live Demo](#) · [Docker Hub](https://hub.docker.com/u/harshasurwase) · [Report Bug](https://github.com/Haruu4304/Quiz-App/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [DevOps Pipeline](#-devops-pipeline)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Docker Setup](#-docker-setup)
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

## 🚀 DevOps Pipeline

This project follows a complete DevOps workflow:

```
Developer pushes code
        ↓
GitHub Actions triggers automatically
        ↓
🔍 SonarCloud scans code quality
        ↓
🐳 Docker images built (client + server)
        ↓
📦 Images pushed to Docker Hub
        ↓
✅ Deployment ready
```

### Pipeline Status
| Stage | Status |
|---|---|
| Code Quality (SonarCloud) | ![Sonar](https://img.shields.io/badge/SonarCloud-passing-4E9BCD?logo=sonarcloud) |
| Docker Build | ![Docker](https://img.shields.io/badge/Docker-passing-2496ED?logo=docker) |
| CI/CD | ![CI](https://img.shields.io/badge/GitHub%20Actions-passing-2088FF?logo=githubactions) |

---

## 🏁 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Docker (optional, for containerized setup)

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

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

```bash
# Build and run both services
docker compose up --build

# Run in background
docker compose up -d
```

| Service | URL |
|---|---|
| Frontend | http://localhost:80 |
| Backend | http://localhost:4000 |

### Pull from Docker Hub

```bash
docker pull harshasurwase/quiz-server:latest
docker pull harshasurwase/quiz-client:latest
```

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
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── Dockerfile
│   └── package.json
│
├── server/                 # Node.js + Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions CI/CD
│
├── docker-compose.yml
├── sonar-project.properties
└── README.md
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Haruu4304">Harsha Surwase</a>
</div>