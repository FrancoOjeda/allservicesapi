const { pool } = require('../base/tablas/DB');

const getListaProfesionales = async (req, res) => {
  try {
    const { profesion } = req.body;
    const profesionales = await pool.query({
      sql: `SELECT usuarios.* 
            FROM usuarios 
            JOIN profesionales ON usuarios.usuario_id = profesionales.usuario_id 
            JOIN profesional_profesiones ON profesionales.profesional_id = profesional_profesiones.profesional_id 
            JOIN profesiones ON profesional_profesiones.profesion_id = profesiones.profesion_id 
            WHERE profesiones.nombre = ?`,
      values: [profesion]
    });

    // Verificar si se encontraron profesionales
    if (!profesionales || profesionales.length === 0) {
      return res.status(404).json({ error: 'No se encontraron profesionales para la profesión especificada' });
    }

    // Enviar la lista de profesionales encontrados
    res.status(200).json({ profesionales });
  } catch (error) {
    console.error('Error al buscar los profesionales:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getListaProfesionales
};
