const DBTurso = require('../base/tablas/tablas')

const getListaProfesionales = async (req, res) => {
  const { profesion } = req.body
  const profesionales = await DBTurso.execute({
    sql: 'SELECT usuarios.* FROM usuarios JOIN profesionales ON usuarios.usuario_id = profesionales.usuario_id JOIN profesional_profesiones ON profesionales.profesional_id = profesional_profesiones.profesional_id JOIN profesiones ON profesional_profesiones.profesion_id = profesiones.profesion_id WHERE profesiones.nombre = :profesion',
    args: { ':profesion': profesion }
  })

  if (!profesionales) {
    res.status(500).json({ error: 'Error al buscar los profesionales' });
  }
  if (!(await profesionales).rows) {
    res.status(500).json({ error: 'Error al buscar los profesionales' });
  }

  console.log(profesionales);
  res.status(200).json({ profesionales: (await profesionales).rows });

}

module.exports = {
  getListaProfesionales
}