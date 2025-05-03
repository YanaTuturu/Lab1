import React, { useContext, useState, useRef } from 'react';
import './style.css';               // ← тут
import { TaskContext } from './context/TaskContext';
import TaskFilter from './components/TaskFilter.jsx';
import TaskList from './components/TaskList.jsx';

export default function App() {
  const { addTask } = useContext(TaskContext);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const inputRef = useRef();

  const handleAdd = () => {
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue('');
      inputRef.current.focus();
    }
  };

  return (
    <div className="container">
      <h1>Список завдань</h1>

      <div style={{ display: 'flex' }}>
        <input
          ref={inputRef}
          className="task-input"
          type="text"
          placeholder="Нове завдання..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          className="add-btn"
          onClick={handleAdd}
        >
          Додати
        </button>
      </div>

      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList filter={filter} />
    </div>
  );
}
