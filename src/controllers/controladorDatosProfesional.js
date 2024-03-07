
const { pool } = require('../base/tablas/DB');

const verificarRegistro = async (email) => {
  const [registro] = await pool.query({
    sql: 'SELECT * FROM profesionales WHERE usuario_id = (SELECT usuario_id FROM usuarios WHERE email = ?)',
    values: [email]
  });
  return registro;
};

const verificarProfesion = async (profesionId) => {
  const [result] = await pool.query({
    sql: 'SELECT COUNT(*) AS count FROM profesiones WHERE profesion_id = ?',
    values: [profesionId]
  });

  return result[0].count > 0;
};

const verificarOficiosRegistrados = async (profesion, profesional) => {
  try {
    const [resultado] = await pool.query({
      sql: 'SELECT * FROM profesional_profesiones WHERE profesion_id = ? AND profesional_id = ?',
      values: [profesion, profesional]
    });
    return resultado;
  } catch (error) {
    console.error('Error al verificar oficios registrados:', error);
    return null; // O puedes manejar el error de otra manera, según tu lógica de la aplicación
  }
}

const obtenerOficiosDelProfesional = async (profesionalId) => {
  try {
    const query = `
      SELECT pp.profesional_id, pp.profesion_id, pp.fecha_alta, p.nombre AS nombre_profesion
      FROM profesional_profesiones pp
      JOIN profesiones p ON pp.profesion_id = p.profesion_id
      WHERE pp.profesional_id = ?
    `;
    const [oficios] = await pool.query({
      sql: query,
      values: [profesionalId]
    });
    return oficios;
  } catch (error) {
    console.error('Error al obtener los oficios del profesional:', error);
    throw error;
  }
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


const postHorarioProfesional = async (req, res) => {
  const { disponibilidad_horaria: horario } = req.body;
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

const postProfesionUsuario = async (req, res) => {
  const { profesion: profesion_id } = req.body;
  const fechaActual = new Date();
  const dia = fechaActual.getDate()
  const mes = fechaActual.getMonth() + 1; // Sumar 1 al mes para obtener el mes correcto
  const año = fechaActual.getFullYear()
  const fecha_alta = `${año}-${mes}-${dia}`; // Orden correcto de año-mes-día
  
  try {
    const user = req.user
    const email = user.reloadUserInfo.email
    const [usuarioId] = await obtenerUsuarioId(email)
    const [profesionalId] = await obtenerProfesionalId(usuarioId.usuario_id)
    const existeProfesion = await verificarProfesion(profesion_id)
    if (!existeProfesion) {
      return res.status(404).json({ error: 'Profesion no encontrada' });
    }
    const profesionRegistrada = await verificarOficiosRegistrados(profesion_id, profesionalId.profesional_id )
    if( profesionRegistrada.length > 0 ) {
      return res.status(400).json({error: "Ya tienes registrada esta profesion"})
    } else {
      const nuevaProfesion = await pool.query({
        sql: 'INSERT INTO profesional_profesiones (profesional_id, profesion_id, fecha_alta) VALUES (?, ?, ?)',
        values: [profesionalId.profesional_id, profesion_id, fecha_alta],
      })
      res.status(201).json({ mensaje: 'Profesión agregada correctamente' });
    }
  } catch (error) {
    console.error('Error al agregar profesión:', error);
    res.status(500).json({ error: 'Error al agregar profesión' });
  }
}


module.exports = {
  getDatosProfesional,
  postHorarioProfesional,
  postProfesionUsuario,
  obtenerOficiosDelProfesional,
  verificarRegistro,
}
