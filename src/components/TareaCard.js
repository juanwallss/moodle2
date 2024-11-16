import { useState } from 'react';

const TareaCard = ({
  tarea,
  onFileUpload,
  onFileDelete,
  onToggleCompleted,
  onDeleteTask, // Recibe la función de eliminación
}) => {
  const [hasFiles, setHasFiles] = useState(tarea.files && tarea.files.length > 0);
  const [files, setFiles] = useState(tarea.files || []);
  const [renameFileIndex, setRenameFileIndex] = useState(null); // Índice del archivo en proceso de renombrar
  const [renameValue, setRenameValue] = useState(''); // Valor temporal para renombrar

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
    setFiles(files.filter((file) => file !== fileName));
  };

  const handleRenameFile = (index) => {
    const updatedFiles = files.map((file, i) => (i === index ? renameValue : file));
    setFiles(updatedFiles);
    setRenameFileIndex(null);
    setRenameValue('');

    localStorage.setItem(`task-${tarea.id}-files`, JSON.stringify(updatedFiles));
  };

  return (
    <div
      className={`w-1/3 overflow-auto h-72 border p-4 rounded shadow mb-4 px-10 bg-white flex flex-col items-left justify-around ${
        tarea.completed ? 'bg-green-400 shadow-lg' : ''
      }`}
    >
      <h2 className={`text-xl font-bold ${tarea.completed ? 'line-through' : ''}`}>
        Titulo: {tarea.title}
      </h2>
      <p className={`text-gray-600 ${tarea.completed ? 'line-through' : ''}`}>
        Descripción: {tarea.description}
      </p>

      {hasFiles && <span className="text-green-500">Archivos subidos</span>}
      {files.length > 0 && (
        <ul className="list-disc list-inside">
          {files.map((file, index) => (
            <li key={index} className="flex w-full justify-between items-center">
              {renameFileIndex === index ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleRenameFile(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setRenameFileIndex(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className='flex flex-row justify-between items-center gap-2'>
                  <span>{file}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRenameFileIndex(index) || setRenameValue(file)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      Renombrar
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className='flex flex-col items-start'>
        

      <label className="mt-4 inline-block w-1/2">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <p className="mt-4 px-4 w-full bg-blue-500 text-white font-semibold rounded-lg cursor-pointer">
          {files.length > 0 ? 'Agregar Otro Archivo' : 'Subir Archivo'}
        </p>
      </label>

      <p
        onClick={() => onToggleCompleted(tarea.id)}
        className={`font-semibold px-4 cursor-pointer ${
          tarea.completed ? 'bg-gray-500' : 'bg-green-500'
        } text-white rounded-lg w-1/2`}
      >
        {tarea.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      </p>

      <button
        onClick={() => onDeleteTask(tarea.id)}
        className="mt-2 text-red-500 hover:text-red-700 border-red-500"
      >
        Eliminar tarea
      </button>
      </div>
    </div>
  );
};

export default TareaCard;
