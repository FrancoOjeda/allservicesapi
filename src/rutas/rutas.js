const express = require('express')
const router = express.Router()


const { cerrarSesionCliente } = require('../controllers/cerrarSesion')
const { postRegistroUsuario, updateUsuario } = require('../controllers/controladorUsuarios')
const { getListaProfesionales } = require('../controllers/controladoreSolicitarProfesionales')
const { postInicioCliente, postInicioProfesional } = require('../controllers/controladorInicio')
const { autorizarUsuario } = require('../autorizacion/autorizarUsuario')
const { perfil } = require('../controllers/controladorDatosPerfil')
const { getDatosCliente, postDireccionCliente, postSobreMi } = require('../controllers/controladorDatosCliente')
const { getDatosProfesional, postHorarioProfesional, postProfesionUsuario } = require('../controllers/controladorDatosProfesional')
const { cargarProfesiones } = require('../controllers/controladorCargarProfesiones')
const { getProfesiones } = require('../controllers/controladorProfesiones')
const { getProfesional } = require('../controllers/controladorProfesional')

router
  /**
   * tags:
   *  - name: Usuarios
   *  description: Endpints para gestión de usuarios
   *  - name: Profesionales
   *  description: Endpints para gestión de profesionales
   *  - name: Profesiones
   *  description: Endpints para gestión de profesiones
   */

  /**
  * @swagger
  * /api/registroUsuarios:
  *   post:
  *     tags: [Usuarios]
  *     summary: Registrar un nuevo usuario en el sistema.
  *     description: Permite a un nuevo usuario registrarse en el sistema.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               nombre:
  *                 type: string
  *                 description: Nombre completo del usuario.
  *               apellido:
  *                 type: string
  *                 description: Apellidos del usuario.
  *               email:
  *                 type: string
  *                 description: Correo electrónico del cliente.
  *               codigo_postal:
  *                 type: number
  *                 description: Código postal de la ciudad de residencia del usuario.
  *               ciudad:
  *                 type: string
  *                 description: Ciudad de residencia del usuario.
  *               provincia:
  *                 type: string
  *                 description: Provincia de residencia del usuario.
  *               password:
  *                 type: string
  *                 description: Contraseña del usuario.
  *     responses:
  *       '200':
  *         description: Usuario registrado correctamente.
  *       '401':
  *         description: Error al registrar el usuario.
  */

  .post('/registroUsuarios', postRegistroUsuario)
  /**
 * @swagger
 * /api/actualizarUsuario:
 *   post:
 *     tags: [Usuarios]
 *     summary: Actualizar información de usuario.
 *     description: Permite al usuario actualizar su información en el sistema.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ciudad:
 *                 type: string
 *                 description: Nueva ciudad de residencia del usuario.
 *               provincia:
 *                 type: string
 *                 description: Nueva provincia de residencia del usuario.
 *               codigo_postal:
 *                 type: number
 *                 description: Nuevo código postal de la ciudad de residencia del usuario.
 *     responses:
 *       '200':
 *         description: Información de usuario actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '401':
 *         description: Error de autenticación o no autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado.
 *       '404':
 *         description: No se encontró un usuario para actualizar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado.
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado.
 */

  .post('/actualizarUsuario', autorizarUsuario, updateUsuario)
  /**
  * @swagger
  * /api/inicioCliente:
  *   post:
  *     tags: [Usuarios]
  *     summary: Iniciar sesión como cliente.
  *     description: Permite a un cliente iniciar sesión en el sistema.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               email:
  *                 type: string
  *                 description: Correo electrónico del cliente.
  *               password:
  *                 type: string
  *                 description: Contraseña del cliente.
  *     responses:
  *       '200':
  *         description: Inicio de sesión exitoso.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 usuario_id:
  *                   type: integer
  *                   description: Identificador único del cliente.
  *                 nombre:
  *                   type: string
  *                   description: Nombre del cliente.
  *                 apellido:
  *                   type: string
  *                   description: Apellido del cliente.
  *                 email:
  *                   type: string
  *                   description: Correo electrónico del cliente.
  *                 codigo_postal:
  *                   type: string
  *                   description: Código postal del cliente.
  *                 ciudad:
  *                   type: string
  *                   description: Ciudad de residencia del cliente.
  *                 provincia:
  *                   type: string
  *                   description: Provincia de residencia del cliente.
  *       '401':
  *         description: Credenciales inválidas.
  */

  .post('/inicioCliente', postInicioCliente)
  /**
* @swagger
* /api/perfil:
*   get:
*     tags: [Usuarios]
*     summary: Obtener perfil de usuario
*     description: Permite obtener el perfil de usuario autenticado.
*     responses:
*       '200':
*         description: Perfil de usuario obtenido satisfactoriamente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 usuario:
*                   type: object
*                   description: Datos del usuario
*                   properties:
*                     usuario_id:
*                       type: integer
*                       description: ID del usuario
*                     nombre:
*                       type: string
*                       description: Nombre del usuario
*                     apellido:
*                       type: string
*                       description: Apellido del usuario
*                     email:
*                       type: string
*                       description: Correo electrónico del usuario
*                     codigo_postal:
*                       type: string
*                       description: Código postal del usuario
*                     ciudad:
*                       type: string
*                       description: Ciudad de residencia del usuario
*                     provincia:
*                       type: string
*                       description: Provincia de residencia del usuario
*       '500':
*         description: Error al obtener el perfil del usuario
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error detallado
*/

  .get('/perfil', autorizarUsuario, perfil)
  /**
* @swagger
* /api/datosCliente:
*   get:
*     tags: [Usuarios]
*     summary: Obtener datos del cliente
*     description: Permite obtener los datos del cliente autenticado.
*     responses:
*       '200':
*         description: Datos del cliente obtenidos satisfactoriamente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 cliente:
*                   type: object
*                   description: Datos del cliente
*                   properties:
*                     usuario_id:
*                       type: integer
*                       description: ID del cliente
*                     direccion:
*                       type: string
*                       description: Dirección del cliente
*       '404':
*         description: Cliente no encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error detallado
*       '500':
*         description: Error al obtener los datos del cliente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error detallado
*/

  .get('/datosCliente', autorizarUsuario, getDatosCliente)
  /**
* @swagger
* /api/datosCliente:
*   post:
*     tags: [Usuarios]
*     summary: Actualizar o registrar datos del cliente
*     description: Permite actualizar o registrar los datos del cliente autenticado.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               direccion:
*                 type: string
*                 description: Dirección del cliente.
*     responses:
*       '201':
*         description: Dirección del cliente actualizada o registrada correctamente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje de éxito
*       '500':
*         description: Error al actualizar o registrar la dirección del cliente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error detallado
*/

  .post('/datosCliente', autorizarUsuario, postDireccionCliente)
  /**
* @swagger
* /api/sobreMi:
*   post:
*     tags: [Usuarios]
*     summary: Actualizar o registrar descripción del cliente
*     description: Permite actualizar o registrar la descripción del cliente autenticado. La longitud máxima de la descripción es de 240 caracteres.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               descripcion:
*                 type: string
*                 description: Descripción del cliente.
*     responses:
*       '201':
*         description: Descripción del cliente actualizada o registrada correctamente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje de éxito
*       '500':
*         description: Error al actualizar o registrar la descripción del cliente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error detallado
*/

  .post('/sobreMi', autorizarUsuario, postSobreMi)
  /**
* @swagger
* /api/cerrarSesion:
*   get:
*     tags: [Usuarios]
*     summary: Cerrar sesión del cliente.
*     description: Permite al cliente cerrar su sesión actual en el sistema.
*     responses:
*       '200':
*         description: Sesión cerrada exitosamente.
*       '401':
*         description: Error al cerrar sesión.
*/

  .get('/cerrarSesion', cerrarSesionCliente)
  /**
  * @swagger
  * /api/solicitarProfesionales:
  *   post:
  *     tags: [Profesionales]
  *     summary: Solicitar profesionales por profesión
  *     description: Permite solicitar profesionales filtrando por una profesión específica.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               profesion:
  *                 type: integer
  *                 description: Id de la profesión por la cual filtrar los profesionales.
  *     responses:
  *       '200':
  *         description: Profesionales encontrados satisfactoriamente
  *         content:
  *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profesionales:
 *                   type: array
 *                   description: Lista de profesionales encontrados
 *                   items:
 *                     type: object
 *                     properties:
 *                       usuario_id:
 *                         type: integer
 *                         description: ID del usuario
 *                       nombre:
 *                         type: string
 *                         description: Nombre del profesional
 *                       apellido:
 *                         type: string
 *                         description: Apellido del profesional
 *                       email:
 *                         type: string
 *                         description: Correo electrónico del profesional
 *                       codigo_postal:
 *                         type: string
 *                         description: Código postal del profesional
 *                       ciudad:
 *                         type: string
 *                         description: Ciudad de residencia del profesional
 *                       provincia:
 *                         type: string
 *                         description: Provincia de residencia del profesional
  *       '500':
  *         description: Error al buscar los profesionales
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *                   description: Mensaje de error detallado
  */

  .post('/solicitarProfesionales', getListaProfesionales)

  /**
 * @swagger
 * /api/datosProfesional:
 *   get:
 *     tags: [Profesionales]
 *     summary: Obtener datos del profesional
 *     description: Obtiene los datos del profesional autenticado.
 *     responses:
 *       '200':
 *         description: Datos del profesional obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profesional:
 *                   type: object
 *                   properties:
 *                     profesional_id:
 *                       type: integer
 *                       description: ID del profesional
 *                     usuario_id:
 *                       type: integer
 *                       description: ID del usuario
 *                     disponibilidad_horaria:
 *                       type: string
 *                       description: Disponibilidad horaria del profesional
 *                     estado:
 *                       type: integer
 *                       description: Estado del profesional
 *                 oficios:
 *                   type: array
 *                   description: Oficios del profesional
 *                   items:
 *                     type: object
 *                     properties:
 *                       profesional_id:
 *                         type: integer
 *                         description: ID del profesional
 *                       profesion_id:
 *                         type: integer
 *                         description: ID de la profesion
 *                       fecha_alta:
 *                         type: string
 *                         description: Fecha de alta del oficio
 *                       nombre_profesion:
 *                         type: string
 *                         description: Nombre del oficio
 *       '404':
 *         description: Profesional no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */

  .get('/datosProfesional', autorizarUsuario, getDatosProfesional)
  /**
 * @swagger
 * /api/horarioProfesional:
 *   post:
 *     tags: [Profesionales]
 *     summary: Actualizar o registrar horario del profesional
 *     description: Permite actualizar o registrar el horario del profesional autenticado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               disponibilidad_horaria:
 *                 type: string
 *                 description: Disponibilidad horaria del profesional.
 *     responses:
 *       '201':
 *         description: Horario del profesional actualizado o registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito
 *       '500':
 *         description: Error al actualizar o registrar el horario del profesional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado
 */
  .post('/horarioProfesional', autorizarUsuario, postHorarioProfesional)
  /**
 * @swagger
 * /api/cargarOficios:
 *   post:
 *     tags: [Profesionales]
 *     summary: Agregar nueva profesión u oficio al perfil del profesional
 *     description: Permite a un profesional agregar una nueva profesión u oficio a su perfil.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profesion:
 *                 type: integer
 *                 description: ID de la profesión u oficio a agregar.
 *     responses:
 *       '201':
 *         description: Profesión u oficio agregado correctamente al perfil del profesional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito
 *       '404':
 *         description: Profesión no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado
 *       '500':
 *         description: Error al agregar la profesión u oficio al perfil del profesional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado
 */
  .post('/cargarOficios', autorizarUsuario, postProfesionUsuario)
  /**
   * @swagger
   * /api/profesiones:
   *   get:
   *     tags: [Profesiones]
   *     summary: Obtener lista de profesiones
   *     description: Obtiene la lista de profesiones disponibles en la base de datos.
   *     responses:
   *       '200':
   *         description: Lista de profesiones obtenida correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   profesion_id:
   *                     type: integer
   *                     description: ID de la profesión
   *                   nombre:
   *                     type: string
   *                     description: Nombre de la profesión
   *                   descripcion:
   *                     type: string
   *                     description: Descripción de la profesión
   *               example:
   *                 - profesion_id: 1
   *                   nombre: Ingeniero
   *                   descripcion: Profesión relacionada con la ingeniería
   *                 - profesion_id: 2
   *                   nombre: Médico
   *                   descripcion: Profesión relacionada con la medicina
   *       '500':
   *         description: Error al obtener la lista de profesiones
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Mensaje de error detallado
   */
  .get('/profesiones', getProfesiones)
  /**
 * @swagger
 * /api/profesional:
 *   get:
 *     tags: [Profesionales]
 *     summary: Obtener datos del profesional
 *     description: Obtiene los datos del profesional autenticado.
 *     parameters:
 *       - name: email
 *         in: query
 *         description: Correo electrónico del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Datos del profesional obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profesional:
 *                   type: object
 *                   properties:
 *                     profesional_id:
 *                       type: integer
 *                       description: ID del profesional
 *                     usuario_id:
 *                       type: integer
 *                       description: ID del usuario
 *                     disponibilidad_horaria:
 *                       type: string
 *                       description: Disponibilidad horaria del profesional
 *                     estado:
 *                       type: integer
 *                       description: Estado del profesional
 *                 oficios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       profesional_id:
 *                         type: integer
 *                         description: ID del profesional
 *                       profesion_id:
 *                         type: integer
 *                         description: ID de la profesión
 *                       fecha_alta:
 *                         type: string
 *                         description: Fecha de alta del oficio
 *                       nombre_profesion:
 *                         type: string
 *                         description: Nombre de la profesión
 *       '404':
 *         description: Profesional no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado
 */
  .post('/profesional', getProfesional)

  .post('/cargarProfesiones', cargarProfesiones)
module.exports = router