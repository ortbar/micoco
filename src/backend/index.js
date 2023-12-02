const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
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

    const result = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);
    const rows = result[0];
    
    if (rows && rows.length > 0) {
      return res.status(400).json({ mensaje: 'El usuario ya existe', success: true });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    await connection.query(
      'INSERT INTO usuario (nombre, email, contrasena, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, 'jugador']
    );

    res.status(200).json({ mensaje: 'Usuario registrado con éxito', success: true });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al registrar usuario', success: false });
  }
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});