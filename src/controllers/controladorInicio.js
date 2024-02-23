const { signInWithEmailAndPassword } = require('firebase/auth')
const { auth } = require('../firebase')
const DBTurso = require('../base/tablas/tablas')


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
  const credenciales = await iniciarSesion(email, password)
  if (credenciales.error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const usuario = await DBTurso.execute({
    sql: 'SELECT * FROM Usuarios WHERE email = :email',
    args: { ':email': email }
  })
  if (!usuario) {
    console.error('Error al buscar el cliente:', err.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
  if (!(await usuario).rows) {
    return res.status(401).json({ error: 'Credenciales inválidas' }); // Cambiar el código de estado a 401 para indicar credenciales inválidas
  }
  res.status(200).json({ cliente: (await usuario).rows }); // Establecer el código de estado como 200 y enviar el cliente como respuesta
}


const postInicioProfesional = async (req, res) => {
  const { email, password } = req.body;
  credenciales = await iniciarSesion(email, password)
  // console.log(credenciales);
  if (credenciales.error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const usuario = await DBTurso.execute({
    sql: 'SELECT * FROM Usuarios WHERE email = :email',
    args: { ':email': email }
  })
  if (!usuario) {
    console.error('Error al buscar el cliente:', err.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
  if (!(await usuario).rows) {
    return res.status(401).json({ error: 'Credenciales inválidas' }); // Cambiar el código de estado a 401 para indicar credenciales inválidas
  }
  res.status(200).json({ profesional: (await usuario).rows }); // Establecer el código de estado como 200 y enviar el cliente como respuesta
}


module.exports = {
  postInicioCliente,
  postInicioProfesional
}