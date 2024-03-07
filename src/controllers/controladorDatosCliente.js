const { pool } = require('../base/tablas/DB')

const verificarRegistro = async (email) => {
  const [registro, fields] = await pool.query({
    sql: 'SELECT * FROM clientes WHERE usuario_id = (SELECT usuario_id FROM usuarios WHERE email = ?)',
    values: [email]
  });
  return registro[0]; // Acceder al primer resultado
}

const obtenerUsuarioId = async (email) => {
  const [usuarioId, fields] = await pool.query({
    sql: 'SELECT usuario_id FROM usuarios WHERE email = ?',
    values: [email]
  });
  return usuarioId[0]; // Acceder al primer resultado
}

const getDatosCliente = async (req, res) => {
  try {
    const user = req.user;
    const email = user.reloadUserInfo.email;
    const cliente = await verificarRegistro(email);
    if (!cliente) {
      res.status(404).json({ error: 'Cliente no encontrado' });
    } else {
      res.status(200).json({ cliente });
    }
  } catch (error) {
    console.error('Error al obtener los datos del cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

const postDireccionCliente = async (req, res) => {
  const { direccion } = req.body;
  try {
    const user = req.user;
    const email = user.reloadUserInfo.email;
    const existeRegistro = await verificarRegistro(email);
    const usuario = await obtenerUsuarioId(email);

    if (existeRegistro) {
      const actualizarDireccion = await pool.query({
        sql: 'UPDATE clientes SET direccion = ? WHERE usuario_id = ?',
        values: [direccion, usuario.usuario_id]
      });
      if (actualizarDireccion[0].affectedRows === 0) {
        res.status(500).json({ error: 'Error al actualizar la dirección' });
      } else {
        res.status(201).json({ mensaje: 'Dirección actualizada correctamente' });
      }
    } else {
      const nuevaDireccion = await pool.query({
        sql: 'INSERT INTO clientes (usuario_id, direccion) VALUES (?, ?)',
        values: [usuario.usuario_id, direccion]
      });
      if (nuevaDireccion[0].affectedRows === 0) {
        res.status(500).json({ error: 'Error al registrar la nueva dirección' });
      } else {
        res.status(201).json({ mensaje: 'Dirección registrada correctamente' });
      }
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


const postSobreMi = async (req, res) => {
  const { descripcion } = req.body;
  if (descripcion.lenght > 240) {
    return res.status(400).json({ error: 'La descripción es demasiado larga' });
  }
  try {
    const user = req.user;
    const email = user.reloadUserInfo.email;
    const existeRegistro = await verificarRegistro(email);
    const usuarioId = await obtenerUsuarioId(email);
    console.log('usuarioId:', usuarioId);
    console.log('existeRegistro:', existeRegistro);
    console.log('descripcion:', descripcion);
    console.log('email: ', email);
    if (existeRegistro) {
      const actualizarRegistro = await pool.query({
        sql: 'UPDATE clientes SET descripcion = ? WHERE usuario_id = ?',
        values: [descripcion, usuarioId.usuario_id]
      })
      if (actualizarRegistro[0].affectedRows === 0) {
        res.status(500).json({ error: 'Error al actualizar la descripción' });
      } else {
        res.status(201).json({ mensaje: 'Descripción actualizada correctamente' });
      }
    } else {
      const nuevoRegistro = await pool.query({
        sql: 'INSERT INTO clientes (usuario_id, descripcion) VALUES (?, ?)',
        values: [usuarioId.usuario_id, descripcion]
      })
      if (nuevoRegistro[0].affectedRows === 0) {
        res.status(500).json({ error: 'Error al registrar la nueva descripción' });
      } else {
        res.status(201).json({ mensaje: 'Descripción registrada correctamente' });
      }
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


module.exports = {
  getDatosCliente,
  postDireccionCliente,
  obtenerUsuarioId,
  postSobreMi
}
