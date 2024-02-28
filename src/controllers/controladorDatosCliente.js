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

const postDatosCliente = async (req, res) => {
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
      if (actualizarDireccion.affectedRows === 0) {
        res.status(500).json({ error: 'Error al actualizar la dirección' });
      } else {
        res.status(201).json({ mensaje: 'Dirección actualizada correctamente' });
      }
    } else {
      const nuevaDireccion = await pool.query({
        sql: 'INSERT INTO clientes (usuario_id, direccion) VALUES (?, ?)',
        values: [usuario.usuario_id, direccion]
      });
      if (nuevaDireccion.affectedRows === 0) {
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

module.exports = {
  getDatosCliente,
  postDatosCliente
}
