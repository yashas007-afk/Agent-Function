# 👨‍💼 MERN Admin Dashboard – Agent Task Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing agents, uploading customer data via CSV/Excel, and automatically distributing tasks among agents.

---

## 🚀 Features

- 🔐 Admin Login & Signup (JWT authentication)
- 👥 Add & View Agents (name, email, mobile, password)
- 📤 Upload CSV/XLSX files
- ⚙️ Distribute tasks evenly among agents
- 📄 View assigned tasks per agent
- 🧼 Clean React UI with CSS (no Tailwind)

---

## 🛠 Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | React (Vite)           |
| Backend    | Node.js + Express.js   |
| Database   | MongoDB                |
| File Upload| Multer, csvtojson, xlsx|
| Auth       | JWT                    |
| Styling    | Plain CSS              |

---


---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

1. Navigate to the backend folder:

```bash
cd mern-admin-backend
npm install

Create a .env file in mern-admin-backend/:

PORT=5050
MONGO_URI=mongodb://localhost:27017/mern
JWT_SECRET=yourSecretKey

npm run dev


### 🔧 Frontend Setup

cd mern-admin-frontend
npm install
npm run dev





