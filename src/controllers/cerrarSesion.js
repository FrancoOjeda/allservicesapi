const { signOut } = require('firebase/auth')
const { auth } = require('../firebase')
const cerrarSesionCliente = async (req, res) => {
  try {
    console.log('Sesion Finalizada');
    const cerrarSesion = await signOut(auth)
    res.status(200).json({ sesion: "Sesion Finalizada" })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  cerrarSesionCliente
}