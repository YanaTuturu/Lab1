import React, { createContext, useState, useEffect, useCallback } from 'react';

// контекст
export const TaskContext = createContext();

//Провайдер
export function TaskProvider({ children }) {
  // Список задач
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  // useEffect для збереження в localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Додавання задачі
  const addTask = useCallback((text) => {
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ]);
  }, []);

  const editTask = useCallback((id, newText) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks, theme,
      addTask, editTask, toggleTask, deleteTask,
      setTheme
    }}>
      {children}
    </TaskContext.Provider>
  );
}
