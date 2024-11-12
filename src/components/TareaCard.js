import { useState } from 'react';

const TareaCard = ({ tarea, onFileUpload, onFileDelete, onToggleCompleted }) => {
  const [hasFiles, setHasFiles] = useState(tarea.hasFiles || false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(tarea.id, file);
      setHasFiles(true);
    }
  };

  return (
    <div className={`border p-4 rounded shadow mb-4 ${tarea.completed ? 'bg-green-100' : ''}`}>
      <h2 className={`text-xl font-bold ${tarea.completed ? 'line-through' : ''}`}>{tarea.title}</h2>
      <p className={`text-gray-600 ${tarea.completed ? 'line-through' : ''}`}>{tarea.description}</p>
      
      <div className="mt-2">
        {hasFiles ? (
          <span className="text-green-500">Archivos subidos</span>
        ) : (
          <span className="text-red-500">No hay archivos</span>
        )}
      </div>
      <label className="block mt-4">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          {hasFiles ? 'Actualizar Archivos' : 'Subir Archivos'}
        </button>
      </label>
      
      {/* Botón para marcar la tarea como completada */}
      <button
        onClick={() => onToggleCompleted(tarea.id)}
        className={`mt-2 px-4 py-2 ${tarea.completed ? 'bg-gray-500' : 'bg-green-500'} text-white rounded`}
      >
        {tarea.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      </button>
    </div>
  );
};

export default TareaCard;
