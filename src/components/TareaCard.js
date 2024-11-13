import { useState } from 'react';

const TareaCard = ({
  tarea,
  onFileUpload,
  onFileDelete,
  onToggleCompleted,
  onDeleteTask // Recibe la función de eliminación
}) => {
  const [hasFiles, setHasFiles] = useState(tarea.files && tarea.files.length > 0);
  const [files, setFiles] = useState(tarea.files || []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(tarea.id, file);
      setFiles([...files, file.name]);
      setHasFiles(true);
    }
  };

  const handleDeleteFile = (fileName) => {
    onFileDelete(tarea.id, fileName);
    setFiles(files.filter(file => file !== fileName));
  };

  return (
    <div className={`border p-4 rounded shadow mb-4 px-10 bg-white ${tarea.completed ? 'bg-green-300 shadow-lg' : ''}`}>
      <h2 className={`text-xl font-bold ${tarea.completed ? 'line-through' : ''}`}>
        {tarea.title}
      </h2>
      <p className={`text-gray-600 ${tarea.completed ? 'line-through' : ''}`}>
        {tarea.description}
      </p>

      {hasFiles && <span className='text-green-500'>Archivos subidos</span>}
      {files.length > 0 && (
        <ul className='list-disc list-inside'>
          {files.map((file, index) => (
            <li key={index} className='flex justify-between items-center'>
              <span>{file}</span>
              <button onClick={() => handleDeleteFile(file)} className='text-red-500 hover:text-red-700 ml-2'>
                Eliminar archivo
              </button>
            </li>
          ))}
        </ul>
      )}

      <label className="mt-4 inline-block">
        <input type='file' onChange={handleFileChange} className='hidden' />
        <p className='mt-4 px-4 w-full bg-blue-500 text-white font-semibold rounded-lg cursor-pointer'>
          {files.length > 0 ? 'Agregar Otro Archivo' : 'Subir Archivo'}
        </p>
      </label>

      <p onClick={() => onToggleCompleted(tarea.id)} className={`font-semibold px-4 cursor-pointer ${tarea.completed ? 'bg-gray-500' : 'bg-green-500'} text-white rounded-lg w-full`}>
        {tarea.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      </p>

      <button onClick={() => onDeleteTask(tarea.id)} className="mt-2 text-red-500 hover:text-red-700">
        Eliminar tarea
      </button>
    </div>
  );
};

export default TareaCard;
