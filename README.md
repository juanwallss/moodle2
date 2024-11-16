📋 Moodle v2

Una aplicación de gestión de tareas intuitiva y bien diseñada, creada con React. Permite a los usuarios gestionar tareas, subir archivos y almacenar datos localmente. Perfecta para la productividad personal o para equipos pequeños que no requieran una base de datos o backend.

🌟 Funcionalidades

Operaciones CRUD: Crear, leer, actualizar y eliminar tareas de manera sencilla.

Subida de archivos: Adjunta archivos a cada tarea y visualiza la lista de archivos subidos.

Almacenamiento Local: Todas las tareas y archivos se guardan en localStorage, manteniendo los datos seguros incluso tras recargar la página.

Completado de Tareas: Marca tareas como completadas y alterna entre los estados completado/pendiente.


🔧 Instalación
Clona el repositorio:

git clone https://github.com/juanwallss/moodle2.git

cd moodle2

Instala las dependencias:

npm install

Ejecuta la aplicación:

npm start

Abre http://localhost:3000 en tu navegador para ver la aplicación.

📂 Estructura del Proyecto

src/components/TareaCard.js: Componente reutilizable para cada tarjeta de tarea, que maneja la visualización de tareas, subida de archivos y el completado de tareas.

src/App.js: Lógica principal de la aplicación, incluyendo la integración con localStorage para la persistencia de las tareas.

🎨 Capturas de Pantalla

![image](https://github.com/user-attachments/assets/8903af3d-9041-4d9c-a3b7-5fc26dd4efcd)



🛠 Tecnologías Utilizadas
React para el desarrollo de la interfaz.

Tailwind CSS para el diseño visual.

localStorage para la persistencia de datos sin backend.

