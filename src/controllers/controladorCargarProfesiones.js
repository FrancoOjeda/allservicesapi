const { pool } = require('../base/tablas/DB');

const cargarProfesiones = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const [result] = await pool.query({
      sql: 'INSERT INTO profesiones (nombre, descripcion) VALUES (?, ?)',
      values: [nombre, descripcion]
    });
    res.status(200).json({ message: 'Profesión cargada correctamente' });
  } catch (error) {
    console.error('Error al cargar la profesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


module.exports = {
  cargarProfesiones
}