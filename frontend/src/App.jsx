import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import TasksView from './components/TasksView';
import DashboardView from './components/DashboardView';
import FocusModeView from './components/FocusModeView';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('tasks');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks. Ensure backend is running.');
      // Fallback to empty array if backend is down
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      // Fetching all tasks again to ensure correct priority sorting from backend
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to add task.');
    }
  };

  const handleUpdateTaskStatus = async (id, completed) => {
    try {
      await updateTask(id, { completed });
      // Refresh to get new priority scores and sorted order
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to update task.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      // Remove from state immediately for better UX, though we could just fetchTasks()
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete task.');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Optima</h1>
        <Navigation currentView={currentView} setView={setCurrentView} />
      </header>

      <main>
        {error && (
          <div className="card" style={{ backgroundColor: '#FEF2F2', borderColor: '#FCA5A5', color: '#EF4444' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading tasks...
          </div>
        ) : (
          <>
            {currentView === 'tasks' && (
              <TasksView 
                tasks={tasks} 
                addTask={handleAddTask} 
                updateTaskStatus={handleUpdateTaskStatus} 
                deleteTask={handleDeleteTask} 
              />
            )}
            
            {currentView === 'dashboard' && (
              <DashboardView tasks={tasks} />
            )}
            
            {currentView === 'focus' && (
              <FocusModeView tasks={tasks} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
