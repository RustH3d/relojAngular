const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Conectar a PostgreSQL usando Sequelize
const sequelize = new Sequelize('reloj', 'postgres', 'L1nk3d', {
  host: 'localhost',
  dialect: 'postgres'
});

// Definir el modelo de Usuario
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Sincronizar el modelo con la base de datos
sequelize.sync();

// Ruta de Registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).send('Usuario registrado');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Ruta de Inicio de Sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'tuSecreto', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Credenciales incorrectas');
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
