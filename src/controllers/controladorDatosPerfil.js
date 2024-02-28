const { pool } = require('../base/tablas/DB');

const perfil = async (req, res) => {
  try {
    const user = req.user;
    const email = user.reloadUserInfo.email;
    const [usuario] = await pool.query({
      sql: 'SELECT * FROM usuarios WHERE email = ?',
      values: [email]
    });

    // Verificar si se encontró el usuario
    if (!usuario || usuario.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Enviar el usuario como respuesta
    res.status(200).json({ usuario: usuario[0] });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  perfil
};
