import React from 'react';
import TaskItem from './TaskItem';

const DashboardView = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Highest priority task out of pending
  const pendingTasksArray = tasks.filter(t => !t.completed);
  const highestPriorityTask = pendingTasksArray.length > 0 
    ? pendingTasksArray.reduce((prev, current) => (prev.priority > current.priority) ? prev : current)
    : null;

  return (
    <div className="view-container">
      <div className="grid grid-cols-3">
        <div className="card stat-card">
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value" style={{ color: 'var(--priority-low)' }}>{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value" style={{ color: 'var(--priority-medium)' }}>{pendingTasks}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Highest Priority Task</h2>
        {highestPriorityTask ? (
          <TaskItem 
            task={highestPriorityTask} 
            onComplete={() => {}} 
            onDelete={() => {}} 
          />
        ) : (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>
            No pending tasks at the moment. You're all caught up!
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
