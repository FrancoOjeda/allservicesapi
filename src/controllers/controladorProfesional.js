const { pool } = require('../base/tablas/DB')
const { obtenerOficiosDelProfesional, verificarRegistro } = require('./controladorDatosProfesional')

const getProfesional = async (req, res) => {

  try {
    const { email } = req.body
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
}

module.exports = {
  getProfesional
}