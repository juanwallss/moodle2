import { useState, useEffect } from 'react';
import TareaCard from './components/TareaCard';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleFileUpload = (taskId, file) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedFiles = [...task.files, file.name];
        localStorage.setItem(`task-${taskId}-files`, JSON.stringify(updatedFiles));
        return { ...task, files: updatedFiles };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleFileDelete = (taskId, fileName) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedFiles = task.files.filter(file => file !== fileName);
        localStorage.setItem(`task-${taskId}-files`, JSON.stringify(updatedFiles));
        return { ...task, files: updatedFiles };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      const newTaskObj = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        completed: false,
        files: [],
      };
      const updatedTasks = [...tasks, newTaskObj];
      setTasks(updatedTasks);
      setNewTask({ title: '', description: '' });
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.removeItem(`task-${taskId}-files`);
  };
  
  const handleToggleCompleted = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className='flex flex-col items-center w-full gap-2 bg-blue-900 h-screen'>
      <h1 className="text-3xl font-semibold mb-6">Lista de Tareas</h1>
      <div className="mb-6 flex flex-col w-1/3 gap-1 justify-center items-center">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Título de la tarea"
          className="px-4 py-2 border rounded mr-2"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Descripción de la tarea"
          className="px-4 py-2 border rounded mr-2"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-500 text-white rounded w-1/2"
        >
          Agregar Tarea
        </button>
      </div>

      <div>
        {tasks.map(task => (
          <TareaCard
            key={task.id}
            tarea={task}
            onFileUpload={handleFileUpload}
            onFileDelete={handleFileDelete}
            onToggleCompleted={handleToggleCompleted}
            onDeleteTask={handleDeleteTask} // Pasamos la función de eliminación
          />
        ))}
      </div>
    </div>
  );
};

export default TaskApp;
