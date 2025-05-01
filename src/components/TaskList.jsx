import React, { useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem.jsx';

export default function TaskList({ filter }) {
  const { tasks } = useContext(TaskContext);

  const filteredTasks = useMemo(() => {
    if (filter === 'active')      return tasks.filter(t => !t.completed);
    if (filter === 'completed')   return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  if (filteredTasks.length === 0) {
    return (
      <p className="text-center text-purple-300 italic">
        Немає завдань
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
