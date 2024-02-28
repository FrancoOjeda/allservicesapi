const { signInWithEmailAndPassword } = require('firebase/auth')
const { auth } = require('../firebase')
const { pool } = require('../base/tablas/DB')


// Verifica las credenciales de acceso en firebase
const iniciarSesion = async (email, password) => {
  try {
    const credenciales = await signInWithEmailAndPassword(auth, email, password)
    return credenciales
  } catch (error) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      return { error: 'Usuario o contraseña incorrectos' }
    } else {
      return { error }
    }
  }
}

const postInicioCliente = async (req, res) => {
  const { email, password } = req.body;

  // Iniciar sesión del cliente
  const credenciales = await iniciarSesion(email, password);
  if (credenciales.error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  try {
    // Consultar el usuario en la base de datos
    const [usuario, fields] = await pool.query({
      sql: 'SELECT * FROM usuarios WHERE email = ?',
      values: [email]
    });

    // Verificar si se obtuvo algún resultado
    if (!usuario || usuario.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // El usuario existe, enviarlo como respuesta
    res.status(200).json({ cliente: usuario[0] });
  } catch (error) {
    console.error('Error al buscar el cliente:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};



const postInicioProfesional = async (req, res) => {
  const { email, password } = req.body;

  // Iniciar sesión del profesional
  const credenciales = await iniciarSesion(email, password);
  if (credenciales.error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  try {
    // Consultar el usuario en la base de datos
    const [usuario, fields] = await pool.query({
      sql: 'SELECT * FROM usuarios WHERE email = ?',
      values: [email]
    });

    // Verificar si se obtuvo algún resultado
    if (!usuario || usuario.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // El usuario existe, enviarlo como respuesta
    res.status(200).json({ profesional: usuario[0] });
  } catch (error) {
    console.error('Error al buscar el profesional:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};



module.exports = {
  postInicioCliente,
  postInicioProfesional
}