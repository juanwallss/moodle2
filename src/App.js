import { useState, useEffect } from 'react';
import TareaCard from './components/TareaCard';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Guardar tareas en localStorage cada vez que se actualicen
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
        localStorage.setItem(`task-${taskId}-files`, JSON.stringify(updatedFiles)); // Guardar archivos
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
        localStorage.setItem(`task-${taskId}-files`, JSON.stringify(updatedFiles)); // Guardar archivos
        return { ...task, files: updatedFiles };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      const newTaskObj = {
        id: tasks.length + 1, // Generar un nuevo id basado en el tamaño actual
        title: newTask.title,
        description: newTask.description,
        completed: false,
        files: [],
      };
      const updatedTasks = [...tasks, newTaskObj];
      setTasks(updatedTasks);
      setNewTask({ title: '', description: '' }); // Limpiar formulario
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    
    // Eliminar la tarea de localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Actualizar tasks en localStorage
    localStorage.removeItem(`task-${taskId}-files`); // Eliminar los archivos asociados a la tarea eliminada
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
    <div>
      <h1 className="text-3xl font-semibold mb-6">Lista de Tareas</h1>

      {/* Formulario para agregar tareas */}
      <div className="mb-6">
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
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Agregar Tarea
        </button>
      </div>

      {/* Lista de tareas */}
      <div>
        {tasks.map(task => (
          <div key={task.id} className="mb-4">
            <TareaCard
              tarea={task}
              onFileUpload={handleFileUpload}
              onFileDelete={handleFileDelete}
              onToggleCompleted={handleToggleCompleted}
            />
            {/* Botón para eliminar tarea */}
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Eliminar tarea
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskApp;
