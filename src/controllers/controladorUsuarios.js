const { createUserWithEmailAndPassword: crearUsuarioEnFirebase } = require('firebase/auth')
const { auth } = require('../firebase')
const DBTurso = require('../base/tablas/tablas')

const registrarUsuarioFB = async (email, password) => {
  try {
    const credencialesDeUsuario = await crearUsuarioEnFirebase(auth, email, password)
    return credencialesDeUsuario
  } catch (error) {
    return Promise.reject(error); // Rechazar la promesa con el error
  }
}

async function postRegistroUsuario(req, res) {
  const { nombre, apellido, email, ciudad, provincia, codigo_postal, password } = req.body

  try {
    const credencialesDeUsuario = await registrarUsuarioFB(email, password)
    if (!credencialesDeUsuario) {
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
    nuevoUsuario = await DBTurso.execute({
      sql: 'INSERT INTO Usuarios (nombre, apellido, email, codigo_postal, ciudad, provincia) VALUES (:nombre, :apellido, :email, :codigo_postal, :ciudad, :provincia)',
      args: {
        ':nombre': nombre,
        ':apellido': apellido,
        ':email': email,
        ':codigo_postal': codigo_postal,
        ':ciudad': ciudad,
        ':provincia': provincia
      }
    })
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

module.exports = {
  postRegistroUsuario
}
