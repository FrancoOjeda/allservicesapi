const DBTurso = require('../base/tablas/tablas')

const perfil = async (req, res) => {
  const user = req.user
  const email = user.reloadUserInfo.email
  const usuario = await DBTurso.execute({
    sql: 'SELECT * FROM Usuarios WHERE email = :email',
    args: { ':email': email }
  })
  res.status(200).json({ usuario: (await usuario).rows }); // Establecer el código de estado como 200 y enviar el usuario como respuesta
}
module.exports = {
  perfil
}