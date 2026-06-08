# Optima

## 📖 Project Description
Optima is a modern, full-stack smart task management application designed to maximize productivity and eliminate decision fatigue. Unlike traditional to-do lists that simply display items sequentially, Optima features an intelligent Node.js backend engine that dynamically calculates the priority of your tasks in real-time. By continuously analyzing your deadlines, the estimated effort required, and explicit importance ratings, Optima automatically surfaces your most critical and time-sensitive work to the top.

Paired with a built-in Pomodoro focus timer, comprehensive dashboard analytics, and a seamless component-driven React interface, Optima is built to help professionals, students, and driven individuals maintain a deep state of uninterrupted focus.

## 🚀 Features

- **Intelligent Priority Engine**: Tasks are automatically scored and sorted based on their deadline proximity, estimated effort, and importance level.
- **Dashboard Analytics**: Real-time stats showing your total, completed, and pending tasks, while highlighting the most critical pending item.
- **Focus Mode (Pomodoro Timer)**: A built-in 25-minute countdown timer designed to keep you focused exclusively on the highest-priority task.
- **State-Driven Navigation**: Seamlessly switch between the Tasks list, Dashboard, and Focus views using custom React state-based routing.
- **Zero-Config Database**: The backend utilizes `mongodb-memory-server` out-of-the-box so you don't need to install or configure MongoDB locally to get started!

## 🛠️ Tech Stack

**Frontend:**
- React (bootstrapped with Vite)
- JavaScript
- HTML5 & CSS3 (Custom styling, Flexbox/Grid, zero external UI libraries)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- `mongodb-memory-server` (for instant local database initialization)
- CORS
- Dotenv

---

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine. For a persistent database in production, you will also need a running [MongoDB](https://www.mongodb.com/) instance or a MongoDB Atlas connection string.

### Configuration

Copy the template environment configuration file to create your own local settings:

```bash
cp .env.example .env
```

Review the `.env` file and adjust settings as needed:
* **`PORT`**: Server port (defaults to `5000`).
* **`NODE_ENV`**: Set to `production` when running the production site.
* **`MONGODB_URI`**: Required in production mode to connect to your real MongoDB database. If left blank in development, Optima will automatically start an in-memory database.
* **`CORS_ORIGIN`**: Allowed CORS origins (defaults to `*`).

### Installation

Install dependencies for the root orchestrator, backend, and frontend with a single command:

```bash
npm run install:all
```

---

## 🏃‍♂️ Running the Application

Optima can be run in two different modes:

### 1. Development Mode (Out-of-the-Box)

In development mode, you can start both the frontend Vite development server and the backend Express server concurrently in a single terminal window:

```bash
npm run dev
```

* **Backend Server** runs at `http://localhost:5000` with an automatic, zero-config in-memory database.
* **Frontend client** runs at `http://localhost:5173` with fast hot-reloads.
* Access the app in your browser at `http://localhost:5173`.

### 2. Production Mode (Server Ready)

In production, the backend server acts as a unified web server, connecting to your real MongoDB database and serving the compiled frontend statically from a single port:

1. **Build the frontend assets:**
   ```bash
   npm run build
   ```
   *(This compiles the React files and outputs them to the `frontend/dist` directory).*

2. **Configure environment variables:**
   Ensure your `.env` file (or your environment config provider) has:
   ```env
   NODE_ENV=production
   MONGODB_URI=your_real_mongodb_connection_string
   ```

3. **Start the production server:**
   ```bash
   npm start
   ```
   *(The server will start, connect to your real database, and host the entire site).*

4. **Access the website:**
   Open `http://localhost:5000` (or whatever `PORT` you configured) in your browser.

---

## 🧠 How the Priority Engine Works

Optima calculates task priority dynamically on the backend using the following logic:
- **Urgency (Deadline Proximity)**: Tasks due sooner receive an exponential bump in priority score.
- **Effort (Estimated Time)**: Factors into how soon you need to start the task.
- **Importance (High/Medium/Low)**: Explicitly scales the priority score to ensure your most critical long-term goals aren't lost underneath small, fast tasks.

## 🏗️ Project Structure

```text
Optima/
├── backend/
│   ├── models/        # Mongoose Database Schemas (Task.js)
│   ├── routes/        # Express REST API Routes
│   ├── utils/         # Priority calculation logic
│   └── server.js      # App entry point & MongoMemoryServer setup
├── frontend/
│   ├── src/
│   │   ├── components/ # React UI views (Tasks, Dashboard, Navigation, TaskItem)
│   │   ├── services/   # Frontend 'fetch' wrapper logic (api.js)
│   │   ├── App.jsx     # Main State orchestration logic
│   │   ├── main.jsx    # Vite App Entry
│   │   └── index.css   # Comprehensive application styling
│   ├── index.html     
│   └── vite.config.js 
└── README.md          
```

---

Enjoy achieving your focus state and maximizing your productivity with Optima!
