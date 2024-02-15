const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'neurodiver'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión exitosa a la base de datos MySQL');
});

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,

};

app.use(cors(corsOptions));
app.use(express.json());

const router = express.Router();

router.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('SELECT * FROM usuario WHERE id = ?', userId, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/usuarios', (req, res) => {
  const { nombre, email, contrasena, rol, tema_interfaz, idioma, ultimo_acceso } = req.body;
  const nuevoUsuario = { nombre, email, contrasena, rol, tema_interfaz, idioma, ultimo_acceso };
  connection.query('INSERT INTO usuario SET ?', nuevoUsuario, (err, result) => {
    if (err) {
      console.error("Error al agregar usuario:", err);
      res.status(500).json("Error interno del servidor al agregar usuario");
    } else {
      console.log("Usuario agregado correctamente:", result);
      res.status(200).json("Usuario agregado correctamente");
    }
  });
});

router.put('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const { nombre, email, contrasena, rol, tema_interfaz, idioma, ultimo_acceso } = req.body;
  const usuarioActualizado = { nombre, email, contrasena, rol, tema_interfaz, idioma, ultimo_acceso };
  connection.query('UPDATE usuario SET ? WHERE id = ?', [usuarioActualizado, userId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.delete('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('DELETE FROM usuario WHERE id = ?', userId, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, contrasena } = req.body;

let error = [];

    if (!nombre || !email || !contrasena) {
      error.push({ mensaje: 'Por favor ingrese todos los campos' });
    }

    if (contrasena.length < 6) {
      error.push({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (error.length > 0) {
      return res.status(400).json({ mensaje: error, success: false });
    }

    connection.query('SELECT COUNT(*) FROM usuario WHERE email = ?', [email], (err, result) => {
      if (err) throw err;

      const rows = result[0]['COUNT(*)'];

      if (rows && rows > 0) {
        return res.status(400).json({ mensaje: 'El usuario ya existe', success: false });
      } else {

        bcrypt.hash(contrasena, 10)
          .then(hashedPassword => {
            connection.query(
              'INSERT INTO usuario (nombre, email, contrasena, rol) VALUES (?, ?, ?, ?)',
              [nombre, email, hashedPassword, 'jugador']
            );

            res.status(201).json({ mensaje: 'Usuario registrado con éxsito', success: true });
            
          })
          .catch(err => {
            // Maneja cualquier error que pueda ocurrir durante el hashing
            console.error(err);
          });


      }



    }

    
    );
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al registrar usuario', success: false });
  }
}    

);

router.post('/iniciar-sesion', async (req, res) => {
  console.log('Solicitud de inicio de sesión recibida');
  try {
    const { email, contrasena } = req.body;
    console.log('Antes de la consulta a la base de datos');
    // Realiza la consulta para obtener el usuario con el email dado desde la base de datos
    connection.query('SELECT * FROM usuario WHERE email = ?', [email], async (err, results) => {
      console.log('Después de la consulta a la base de datos');
      
      if (err) {
        console.error('Error en la consulta a la base de datos:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      console.log(results)

      if (results[0].length === 0) {
        console.log('Usuario no encontrado');
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }

      const user = results[0];

      // Compara la contraseña proporcionada con el hash almacenado en la base de datos
      const contrasenaValida = await bcrypt.compare(contrasena, user.contrasena);

      if (!contrasenaValida) {
        console.log('Contraseña no válida');
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }

      // Genera un token JWT
      const token = jwt.sign({ userId: user.id, email: user.email }, 'tuSecreto', { expiresIn: '1h' });

      console.log('Inicio de sesión exitoso');
      res.json({ token, user });

    });
  } catch (error) {
    console.error('Error en inicio de sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.get('/acertijos', (req, res) => {
  console.log('Solicitud de acertijos recibida');
  connection.query('SELECT * FROM acertijo', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/acertijos', (req, res) => {
  const { id_juego, cancion_url, imagen_url, pista, solucion } = req.body;
  const nuevoAcertijo = {id_juego,cancion_url, imagen_url, pista, solucion,pregunta };
  connection.query('INSERT INTO acertijo SET ?', nuevoAcertijo, (err, result) => {
    if (err) {
      console.error("Error al agregar acertijo:", err);
      res.status(500).json("Error interno del servidor al agregar acertijo");
    } else {
      console.log("Acertijo agregado correctamente:", result);
      res.status(200).json("Acertijo agregado correctamente");
    }
  });
});

router.get('/acertijos/:id', (req, res) => {
  const acertijoId = req.params.id; // Cambiado de id_acertijo a id
  const { id_ac, id_juego, cancion_url, imagen_url, pista, solucion,pregunta } = req.body;
  const acertijoActualizado = { id_ac, id_juego, cancion_url, imagen_url, pista, solucion,pregunta };
  connection.query('SELECT * FROM acertijo WHERE id_ac = ?', acertijoId, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

router.put('/acertijos/:id', (req, res) => {
  console.log('Solicitud de actualización de acertijo recibida');
  const acertijoId = req.params.id;
  const { id_ac, id_juego, cancion_url, imagen_url, pista, solucion,pregunta } = req.body;
  const acertijoActualizado = { id_ac, id_juego, cancion_url, imagen_url, pista, solucion,pregunta };
  connection.query('UPDATE acertijo SET ? WHERE id_ac = ?', [acertijoActualizado, acertijoId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});






app.use('/', router);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});