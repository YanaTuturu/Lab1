import React, { useContext, useState, useRef } from 'react';
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
    <div className="min-h-screen bg-purple-50 flex flex-col items-center py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-purple-200">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
          Список завдань
        </h1>

        {/*додавання */}
        <div className="flex mb-6">
          <input
            ref={inputRef}
            type="text"
            className="flex-grow p-3 border-2 border-purple-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Нове завдання..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            className="px-6 rounded-r-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition"
            onClick={handleAdd}
          >
            Додати
          </button>
        </div>

        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList filter={filter} />
      </div>
    </div>
  );
}
