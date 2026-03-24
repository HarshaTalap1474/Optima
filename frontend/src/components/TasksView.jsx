import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TasksView = ({ tasks, addTask, updateTaskStatus, deleteTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    time: '',
    importance: '2'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.deadline || !formData.time) return;
    
    // Convert local datetime to UTC for consistency or just pass as is
    addTask({
      ...formData,
      time: Number(formData.time),
      importance: Number(formData.importance)
    });
    
    setFormData({
      title: '',
      deadline: '',
      time: '',
      importance: '2'
    });
  };

  return (
    <div className="view-container">
      <div className="card">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Task Title</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              placeholder="What needs to be done?"
              required 
            />
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <input 
              type="datetime-local" 
              value={formData.deadline} 
              onChange={(e) => setFormData({...formData, deadline: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Estimated Time (minutes)</label>
            <input 
              type="number" 
              min="1"
              value={formData.time} 
              onChange={(e) => setFormData({...formData, time: e.target.value})} 
              placeholder="e.g. 30"
              required 
            />
          </div>
          <div className="form-group">
            <label>Importance</label>
            <select 
              value={formData.importance} 
              onChange={(e) => setFormData({...formData, importance: e.target.value})}
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
            <button type="submit" className="btn">Add Task</button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Your Tasks</h2>
        {tasks.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            No tasks found. Add a task above to get started!
          </div>
        ) : (
          <div>
            {tasks.map(task => (
              <TaskItem 
                key={task._id} 
                task={task} 
                onComplete={updateTaskStatus} 
                onDelete={deleteTask} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksView;
