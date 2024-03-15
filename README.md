# Cocowin
Cocowin es una aplicación web interactiva que ofrece una variedad de juegos de acertijos cognitivos para entretener a usuarios de todas las edades. Diseñada como parte de mi proyecto de graduación como Jr. Web Developer, surge de mi interés por el desarrollo web y el deseo de aplicar mis conocimientos adquiridos durante mi formación. 
Aunque inicialmente he desarrollado un juego, como "Adivina el Personaje", esta plataforma está preparada para incluir más juegos cognitivos en el futuro. 
Este juego inicial está diseñado para estimular la creatividad y la agudeza mental, ofreciendo a los usuarios una experiencia de entretenimiento educativa y gratificante.
 La aplicación presenta dos roles de usuario distintos: jugadores individuales que buscan desafiar sus propias habilidades cognitivas, así como jugadores/administradores.


## Manual de Instalación de Cocowin

Para comenzar a utilizar Cocowin, sigue estos sencillos pasos:

### 1. Descargar el proyecto
Puedes obtener el código de Cocowin desde el repositorio en GitHub. Dirígete a [este enlace](https://github.com/ortbar/micoco.git) y descarga el proyecto.

### 2. Instalar Node.js
Asegúrate de tener Node.js instalado en tu sistema. Si no lo tienes, puedes descargarlo e instalarlo desde [este enlace](https://nodejs.org/en/download/current).

### 3. Instalar dependencias
Desde la carpeta raíz del proyecto y la carpeta `src/backend`, ejecuta `npm install` para instalar todas las dependencias necesarias.

### 4. Descargar e instalar MariaDB
Descarga e instala MariaDB en tu sistema. Se recomienda utilizar XAMPP, que facilita este proceso.

### 5. Crear la base de datos
Crea una base de datos llamada `neurodiver` en tu servidor MariaDB. Puedes utilizar cualquier herramienta de administración de bases de datos o la interfaz web proporcionada por XAMPP (phpMyAdmin) para este fin.

### 6. Alimentar la base de datos
Ejecuta el script `alimentarBD.sql`, ubicado en `src/backend`, en tu base de datos recién creada. Este script creará las tablas necesarias y llenará la base de datos con datos de ejemplo.

### 7. Configurar la conexión a la base de datos
En el archivo `index.js` dentro de la carpeta `src/backend`, encontrarás la constante `connection`, que contiene los parámetros de conexión a la base de datos. Asegúrate de modificar estos parámetros según tu configuración.

### 8. Lanzar el servidor y el cliente
- Ejecuta el servidor ejecutando `node src/backend/index.js`.
- Inicia el cliente ejecutando `ng server -o`. Esta opción abrirá automáticamente el navegador predeterminado.

Una vez completados estos pasos, podrás acceder a Cocowin utilizando las siguientes credenciales:

- **Email**: alexx2@gmail.com (administrador) o aleii8@gmail.com (jugador)
- **Contraseña**: 12345@

