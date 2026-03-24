import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

const FocusModeView = ({ tasks }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  // Highest priority pending task
  const pendingTasksArray = tasks.filter(t => !t.completed);
  const highestPriorityTask = pendingTasksArray.length > 0 
    ? pendingTasksArray.reduce((prev, current) => (prev.priority > current.priority) ? prev : current)
    : null;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      // Optional: Play a sound or show a notification
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="view-container timer-container">
      <div className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <div className="timer-controls">
        <button 
          className="btn" 
          onClick={toggleTimer}
          style={{ width: '120px' }}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>

      <div className="focus-task-card">
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Current Focus Task</h3>
        {highestPriorityTask ? (
          <div style={{ textAlign: 'left' }}>
            <TaskItem 
              task={highestPriorityTask} 
              onComplete={() => {}} 
              onDelete={() => {}} 
            />
          </div>
        ) : (
          <div className="card" style={{ color: 'var(--text-muted)' }}>
            No pending tasks. Great job!
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusModeView;
