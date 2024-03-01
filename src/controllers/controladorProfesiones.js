const { pool } = require('../base/tablas/DB');

const getProfesiones = async (req, res) => {
  try {
    // Consultar la base de datos para obtener las profesiones
    const result = await pool.query({
      sql: 'SELECT * FROM profesiones'
    });

    // Extraer la lista de profesiones del resultad;

    // Retornar la lista de profesiones
    return res.status(200).json({ profesiones: result });
  } catch (error) {
    // Manejar errores
    console.error('Error al obtener las profesiones:', error);
    return res.status(500).json({ error: 'Error al obtener las profesiones' });
  }
};

module.exports = {
  getProfesiones
}