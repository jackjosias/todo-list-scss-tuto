// src/app/presentation/pages/views/home/components/TaskInput.tsx
import React from 'react';

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAddTask: () => void;
  placeholder?: string;
  buttonText?: string;
  disabled?: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({
  value,
  onChange,
  onAddTask,
  placeholder = "Ajouter une nouvelle tâche infernale...",
  buttonText = "Ajouter",
  disabled = false,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onAddTask();
    }
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input-field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label="Nouvelle tâche"
      />
      <button
        type="submit"
        className="task-add-button"
        disabled={disabled || !value.trim()}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default TaskInput;