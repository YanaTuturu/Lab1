import React, { useContext, useState, useRef } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask, editTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);
  const editRef = useRef();

  const handleSave = () => {
    if (editValue.trim()) {
      editTask(task.id, editValue.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-purple-200">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5 text-purple-500 focus:ring-purple-400"
        />
        {isEditing ? (
          <input
            ref={editRef}
            className="border-2 border-purple-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <span
            className={`cursor-pointer ${task.completed ? 'line-through text-purple-300' : 'text-purple-700'}`}
            onDoubleClick={() => {
              setIsEditing(true);
              setTimeout(() => editRef.current?.focus(), 0);
            }}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex space-x-3">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded-lg bg-green-200 text-green-700 font-medium hover:bg-green-300 transition"
          >
            Зберегти
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 rounded-lg bg-purple-200 text-purple-700 hover:bg-purple-300 transition"
          >
            Редагувати
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
        >
          Видалити
        </button>
      </div>
    </li>
  );
}
