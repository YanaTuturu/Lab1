import React, { useContext, useState, useRef } from 'react';
import { TaskContext } from '../context/TaskContext';
import '../style.css';

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
    <li className="task-item">
      <div className="left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        {isEditing ? (
          <input
            ref={editRef}
            className="task-input"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <span
            className={task.completed ? 'completed' : ''}
            onDoubleClick={() => {
              setIsEditing(true);
              setTimeout(() => editRef.current?.focus(), 0);
            }}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>Зберегти</button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Редагувати</button>
        )}
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>Видалити</button>
      </div>
    </li>
  );
}
