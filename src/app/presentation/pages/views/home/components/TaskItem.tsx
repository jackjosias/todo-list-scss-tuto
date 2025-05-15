// src/app/presentation/pages/views/home/components/TaskItem.tsx
import React from 'react';
import { Task } from '../home.view';

// CONVENTION_COMMENTAIRES_JACK_JOSIAS_EMOJI_V7_2_0:
// 🗑️ Icône SVG pour la poubelle.
// @author Jack-Josias_ULTIMATE_v7.2.0
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.796.075-1.542.27-2.226.564A2.755 2.755 0 001.5 7.016v7.234c0 1.054.63 1.966 1.557 2.436A3.26 3.26 0 006 17.75h8c1.518 0 2.833-.938 3.25-2.298a2.755 2.755 0 00-.726-2.436c-.684-.295-1.43-.49-2.227-.564v-.443A2.75 2.75 0 0011.25 1h-2.5zM7.5 3.75c0-.966.784-1.75 1.75-1.75h1.5c.966 0 1.75.784 1.75 1.75v.425c-.21.03-.417.068-.625.107V3.75a.625.625 0 00-.625-.625h-1.5a.625.625 0 00-.625.625v.532c-.208-.04-.415-.078-.625-.107V3.75zM3.25 7.016c.082.002.163.008.243.018a1.76 1.76 0 011.007.636C5.29 8.54 6 9.867 6 11.25v2.505a3.251 3.251 0 00-2.75-.001V7.016zm13.5 0v6.738a3.251 3.251 0 00-2.75.001V11.25c0-1.383.71-2.71 1.5-3.58a1.76 1.76 0 011.007-.636c.08-.01.16-.016.243-.018z" clipRule="evenodd" />
  </svg>
);

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDeleteTask }) => {
  return (
    // CONVENTION_COMMENTAIRES_JACK_JOSIAS_EMOJI_V7_2_0:
    // 🆔 Ajout de l'ID de la tâche à l'élément li pour que l'animation de suppression puisse le cibler.
    // @author Jack-Josias_ULTIMATE_v7.2.0
    <li id={task.id} className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <span
        className="task-item__text"
        onClick={() => onToggleComplete(task.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Empêche le scroll sur Espace
            onToggleComplete(task.id);
          }
        }}
        aria-pressed={task.completed}
        aria-label={`Marquer la tâche ${task.text} comme ${task.completed ? 'non complétée' : 'complétée'}`}
      >
        {task.text}
      </span>
      <button
        className="task-item__delete-button"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Supprimer la tâche ${task.text}`}
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default TaskItem;