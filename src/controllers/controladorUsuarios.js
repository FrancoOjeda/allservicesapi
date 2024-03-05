const { createUserWithEmailAndPassword: crearUsuarioEnFirebase } = require('firebase/auth')
const { obtenerUsuarioId } = require('./controladorDatosCliente')
const { auth } = require('../firebase')
const { pool } = require('../base/tablas/DB')

// Verifica la existencia de un usuario que utilice el email de la request
const registrarUsuarioFireBase = async (email, password) => {
  try {
    const credencialesDeUsuario = await crearUsuarioEnFirebase(auth, email, password)
    return credencialesDeUsuario
  } catch (error) {
    return Promise.reject(error); // Rechazar la promesa con el error
  }
}

// Maneja el registro del usuario, haciendo uso de la validacion de email's existentes en uso
async function postRegistroUsuario(req, res) {
  const { nombre, apellido, email, ciudad, provincia, codigo_postal, password } = req.body

  try {
    const credencialesDeUsuario = await registrarUsuarioFireBase(email, password)
    if (!credencialesDeUsuario) {
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
    const nuevoUsuario = await pool.query({
      sql: 'INSERT INTO usuarios (nombre, apellido, email, codigo_postal, ciudad, provincia) VALUES (?, ?, ?, ?, ?, ?)',
      values: [nombre, apellido, email, codigo_postal, ciudad, provincia]
    });


    if (!nuevoUsuario) {
      console.error(error.message);
      res.status(500).json({ error: 'Error al registrar el usuario' });
    } else {
      console.log('Usuario creado correctamente')
      res.status(201).json({ mensaje: 'Usuario creado correctamente' });
    }

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      res.status(400).json({ error: 'El correo ingresado ya existe' });
    } else if (error.code === 'auth/invalid-email') {
      res.status(400).json({ error: 'El correo ingresado es inválido' });
    } else if (error.code === 'auth/weak-password') {
      res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    } else {
      res.status(400).json({ error: 'Algo no ha salido como esperábamos' });
      console.log(error);
    }
  }
}


const updateUsuario = async (req, res) => {
  const { ciudad, provincia, codigo_postal } = req.body
  try {
    const user = req.user
    const email = user.reloadUserInfo.email;
    const usuarioId = await obtenerUsuarioId(email)
    const actualizarUsuario = await pool.query({
      sql: 'UPDATE usuarios SET codigo_postal = ?, ciudad = ?, provincia = ? WHERE usuario_id = ?',
      values: [codigo_postal, ciudad, provincia, usuarioId.usuario_id]
    })
    if (actualizarUsuario[0].affectedRows > 0) {
      return res.status(200).json({ mensaje: "Información de usuario actualizada correctamente" })
    } else {
      return res.status(404).json({ error: "No se encontró un usuario para actualizar con el email proporcionado" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'Error interno del servidor'
    })
  }
}

module.exports = {
  postRegistroUsuario,
  updateUsuario
}
