import React from 'react';
import '../style.css';

export default function TaskFilter({ filter, setFilter }) {
  return (
    <div className="filters">
      {['all', 'active', 'completed'].map(mode => (
        <button
          key={mode}
          className={`filter-btn ${filter === mode ? 'active' : ''}`}
          onClick={() => setFilter(mode)}
        >
          {mode === 'all' ? 'Усі' : mode === 'active' ? 'Невиконані' : 'Виконані'}
        </button>
      ))}
    </div>
  );
}
