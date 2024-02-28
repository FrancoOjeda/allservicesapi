const { pool } = require('../base/tablas/DB');

const verificarRegistro = async (email) => {
  const [registro] = await pool.query({
    sql: 'SELECT * FROM profesionales WHERE usuario_id = (SELECT usuario_id FROM usuarios WHERE email = ?)',
    values: [email]
  });
  return registro;
};

const obtenerOficiosDelProfesional = async (profesionalId) => {
  const [oficios] = await pool.query({
    sql: 'SELECT * FROM profesional_profesiones WHERE profesional_id = ?',
    values: [profesionalId]
  });
  return oficios;
};

const obtenerUsuarioId = async (email) => {
  const [usuarioId] = await pool.query({
    sql: 'SELECT usuario_id FROM usuarios WHERE email = ?',
    values: [email]
  });
  return usuarioId;
};

const obtenerProfesionalId = async (usuarioId) => {
  const [profesionalId] = await pool.query({
    sql: 'SELECT profesional_id FROM profesionales WHERE usuario_id = ?',
    values: [usuarioId]
  });
  return profesionalId;
};

const getDatosProfesional = async (req, res) => {
  try {
    const user = req.user;
    const email = user.reloadUserInfo.email;
    const profesional = await verificarRegistro(email);
    if (!profesional || profesional.length === 0) {
      return res.status(404).json({ error: 'Profesional no encontrado' });
    }

    const profesionalId = profesional[0].profesional_id;
    const oficios = await obtenerOficiosDelProfesional(profesionalId);
    res.status(200).json({ profesional: profesional[0], oficios });
  } catch (error) {
    console.error('Error al obtener los datos del profesional:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getDatosProfesional
};


const postHorarioProfesional = async (req, res) => {
  const { disponibilidad_horaria: horario, profesion } = req.body;
  try {
    const user = req.user;
    const email = user.reloadUserInfo.email;
    const existeRegistro = await verificarRegistro(email);
    const [usuarioId] = await obtenerUsuarioId(email);

    if (existeRegistro && existeRegistro.length > 0) {
      const actualizarHorario = await pool.query({
        sql: 'UPDATE profesionales SET disponibilidad_horaria = ? WHERE usuario_id = ?',
        values: [horario, usuarioId.usuario_id]
      });
      if (!actualizarHorario) {
        return res.status(500).json({ error: 'Error al actualizar el horario' });
      }
      return res.status(200).json({ mensaje: 'Disponibilidad horaria actualizada correctamente' });
    } else {
      const nuevoHorario = await pool.query({
        sql: 'INSERT INTO profesionales (usuario_id, disponibilidad_horaria) VALUES (?, ?)',
        values: [usuarioId.usuario_id, horario]
      });
      if (!nuevoHorario) {
        return res.status(500).json({ error: 'Error al registrar el nuevo horario' });
      }
      return res.status(201).json({ mensaje: 'Horario registrado correctamente' });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};



module.exports = {
  getDatosProfesional,
  postHorarioProfesional
}