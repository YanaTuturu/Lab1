import React from 'react';

export default function TaskFilter({ filter, setFilter }) {
  const baseBtn = "px-4 py-2 rounded-lg font-medium transition";
  const active  = "bg-purple-400 text-white";
  const inactive= "bg-purple-100 text-purple-600 hover:bg-purple-200";

  return (
    <div className="flex justify-center mb-6 space-x-3">
      <button
        className={`${baseBtn} ${filter === 'all' ? active : inactive}`}
        onClick={() => setFilter('all')}
      >
        Усі
      </button>
      <button
        className={`${baseBtn} ${filter === 'active' ? active : inactive}`}
        onClick={() => setFilter('active')}
      >
        НЕвиконані
      </button>
      <button
        className={`${baseBtn} ${filter === 'completed' ? active : inactive}`}
        onClick={() => setFilter('completed')}
      >
        Виконані
      </button>
    </div>
  );
}
