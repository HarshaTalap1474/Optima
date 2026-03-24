import React from 'react';

const Navigation = ({ currentView, setView }) => {
  return (
    <nav className="nav-container">
      <button 
        className={`nav-button ${currentView === 'tasks' ? 'active' : ''}`}
        onClick={() => setView('tasks')}
      >
        Tasks
      </button>
      <button 
        className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
        onClick={() => setView('dashboard')}
      >
        Dashboard
      </button>
      <button 
        className={`nav-button ${currentView === 'focus' ? 'active' : ''}`}
        onClick={() => setView('focus')}
      >
        Focus Mode
      </button>
    </nav>
  );
};

export default Navigation;
