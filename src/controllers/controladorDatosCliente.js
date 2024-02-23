const DBTurso = require('../base/tablas/tablas');

const verificarRegistro = async (email) => {
  const registro = await DBTurso.execute({
    sql: 'SELECT * FROM clientes WHERE usuario_id = ( SELECT usuario_id FROM usuarios WHERE email = :email);',
    args: { ':email': email }
  })
  return registro
}
const obtenerUsuarioId = async (email) => {
  const usuarioId = await DBTurso.execute({
    sql: 'SELECT usuario_id FROM usuarios WHERE email = :email',
    args: { ':email': email }
  })
  return usuarioId
}

const getDatosCliente = async (req, res) => {
  try {
    const user = req.user;
    const email = user.reloadUserInfo.email;
    const cliente = await verificarRegistro(email);
    if (!cliente) {
      res.status(404).json({ error: 'Cliente no encontrado' });
    } else {
      res.status(200).json({ cliente: cliente.rows });
    }
  } catch (error) {
    console.error('Error al obtener los datos del cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

const postDatosCliente = async (req, res) => {
  const { direccion } = req.body
  try {
    const user = req.user;
    const email = user.reloadUserInfo.email;
    const existeRegistro = await verificarRegistro(email)
    const usuario_id = await obtenerUsuarioId(email)

    if (existeRegistro) {
      const actualizarDireccion = await DBTurso.execute({
        sql: 'UPDATE clientes SET direccion = :direccion WHERE usuario_id = :usuario_id',
        args: {
          direccion: direccion,
          usuario_id: usuario_id.rows[0].usuario_id
        }
      })
      if (!actualizarDireccion) {
        res.status(500).json({ error: 'Error al registrar la nueva dirección' });
      } else {
        res.status(201).json({ mensaje: 'Dirección actualizada correctamente' });
      }
    } else {
      const nuevaDireccion = await DBTurso.execute({
        sql: 'INSERT INTO clientes (usuario_id, direccion) VALUES (:usuario_id, :direccion)',
        args: {
          usuario_id: usuario_id.rows[0].usuario_id,
          direccion: direccion,
        }
      })
      if (!nuevaDireccion) {
        res.status(500).json({ error: 'Error al registrar la nueva dirección' });
      } else {
        res.status(201).json({ mensaje: 'Dirección registrada correctamente' });
      }
    }

  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
  // const usuario = await DBTurso.execute({
  //   sql: 'UPDATE usuarios SET nombre = :nombre, apellido = :apellido, password = :password, codigo_postal = :codigo_postal, ciudad = :ciudad, provincia = :provincia WHERE email = :email',
  //   args: ""
  // })
}


module.exports = {
  getDatosCliente,
  postDatosCliente
}