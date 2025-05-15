// src/app/presentation/pages/views/home/home.view.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
// CONVENTION_COMMENTAIRES_JACK_JOSIAS_EMOJI_V7_2_0:
// 🔥 Importation du point d'entrée SCSS pour CETTE VUE.
// Next.js s'occupera de le compiler et de l'injecter.
// @author Jack-Josias_ULTIMATE_v7.2.0
import './core_styles/home.scss';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = 'todoAppTasks_JackJosias_Inferno_v7_2'; // Clé de stockage mise à jour

const HomeView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true); // Mettre à true au début du chargement
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Erreur démoniaque lors du chargement des tâches depuis localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Erreur démoniaque lors de la sauvegarde des tâches dans localStorage:", error);
      }
    }
  }, [tasks, isLoading]);

  const handleAddTask = useCallback(() => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskText('');
  }, [newTaskText]);

  const handleToggleComplete = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    const taskElement = document.getElementById(id); // L'ID doit être sur l'élément li
    if (taskElement) {
      taskElement.style.opacity = '0';
      taskElement.style.transform = 'translateX(-30px) scale(0.9)'; // Animation de sortie plus prononcée
      setTimeout(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      }, 300); // Correspondre à la durée de transition SCSS
    } else {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
  }, []);

  if (isLoading) {
    return (
      <main className="home-todo-container">
        <div className="todo-list-wrapper">
          <h1 className="home-title">Chargement des tâches infernales...</h1>
          {/* CONVENTION_COMMENTAIRES_JACK_JOSIAS_EMOJI_V7_2_0: ✨ Un simple loader textuel pour l'instant */}
          {/* @author Jack-Josias_ULTIMATE_v7.2.0 */}
        </div>
      </main>
    );
  }

  return (
    <main className="home-todo-container">
      <div className="todo-list-wrapper">
        <h1 className="home-title">Todo List SCSS Inferno 🔥</h1>
        <TaskInput
          value={newTaskText}
          onChange={setNewTaskText}
          onAddTask={handleAddTask}
        />
        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task} // L'ID est passé ici pour être utilisé dans TaskItem
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </ul>
        ) : (
          // CONVENTION_COMMENTAIRES_JACK_JOSIAS_EMOJI_V7_2_0:
          // ✨ Utilisation de la classe stylée pour le message "aucune tâche"
          // @author Jack-Josias_ULTIMATE_v7.2.0
          <p className="no-tasks-message">
            Aucune tâche pour l&nbsp;instant. Ajoutes-en une pour commencer ton règne ! 😈
          </p>
        )}
      </div>
    </main>
  );
};

export default HomeView;