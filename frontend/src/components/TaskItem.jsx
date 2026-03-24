import React from 'react';

const TaskItem = ({ task, onComplete, onDelete }) => {
  const getPriorityClass = (priority, completed) => {
    if (completed) return '';
    if (priority >= 80) return 'task-high';
    if (priority >= 40) return 'task-medium';
    return 'task-low';
  };

  const getImportanceBadge = (importance) => {
    switch(Number(importance)) {
      case 3: return <span className="badge badge-high">High</span>;
      case 2: return <span className="badge badge-medium">Medium</span>;
      case 1:
      default: return <span className="badge badge-low">Low</span>;
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${getPriorityClass(task.priority, task.completed)}`}>
      <div className="task-info">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-meta">
          <span>{new Date(task.deadline).toLocaleDateString()} {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{task.time} mins</span>
          {getImportanceBadge(task.importance)}
          {task.priority > 0 && <span className="badge" style={{ backgroundColor: '#E2E8F0', color: '#475569' }}>Priority Score: {task.priority}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          className="btn btn-secondary" 
          onClick={() => onComplete(task._id, !task.completed)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button 
          className="btn btn-danger" 
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
