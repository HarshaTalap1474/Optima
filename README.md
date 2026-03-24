# Optima

Optima is a modern, full-stack smart task management application designed to maximize your productivity. It features a sleek, minimal UI built entirely with native React and custom CSS, and a powerful Node.js/Express backend that handles dynamic task prioritization.

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

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HarshaTalap1474/Optima.git
   cd Optima
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

---

## 🏃‍♂️ Running the Application

Because Optima is a full-stack application, you will need to run both the backend server and the frontend client simultaneously in two separate terminal windows.

### 1. Start the Backend Server
Open a terminal, navigate to the `backend` folder, and start the server:

```bash
cd backend
node server.js
```
*Note: You should see messages indicating that the server is running on port `5000` and the in-memory MongoDB is connected successfully.*

### 2. Start the Frontend Application
Open a second terminal, navigate to the `frontend` folder, and start the Vite development server:

```bash
cd frontend
npm run dev
```

### 3. Open the App
Once Vite is running, it will provide a local URL (e.g., `http://localhost:5173/` or `http://localhost:5174/`). Open this URL in your web browser to start using Optima!

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
