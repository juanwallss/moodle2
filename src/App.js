import { useState, useEffect } from 'react';
import TareaCard from './components/TareaCard';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // Estado para el filtro

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

  // Filtrar las tareas según el estado del filtro
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'notCompleted') return !task.completed;
    return true; // 'all'
  });

  return (
    <div className='flex flex-col items-center overflow-auto w-full gap-2 bg-blue-900 h-screen'>
      <h1 className="mt-3 text-white text-3xl font-semibold mb-6">Moodle v2</h1>

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

      {/* Botones de filtrado */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter('notCompleted')}
          className={`px-4 py-2 rounded ${filter === 'notCompleted' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          No Completadas
        </button>
      </div>

      {/* Mostrar tareas filtradas */}
      <div className='w-full p-6 flex flex-col items-center'>
        {filteredTasks.map(task => (
          <TareaCard
            key={task.id}
            tarea={task}
            onFileUpload={handleFileUpload}
            onFileDelete={handleFileDelete}
            onToggleCompleted={handleToggleCompleted}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskApp;
