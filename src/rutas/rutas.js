const express = require('express')
const router = express.Router()


const { cerrarSesionCliente } = require('../controllers/cerrarSesion')
const { postRegistroUsuario } = require('../controllers/controladorUsuarios')
const { getListaProfesionales } = require('../controllers/solicitarProfesionales')
const { postInicioCliente, postInicioProfesional } = require('../controllers/controladorInicio')
router
  /**
  * @openapi
  * /api/cerrarSesion:
  *   get:
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
 * @openapi
 * /api/inicioCliente:
 *   post:
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
 *       '401':
 *         description: Credenciales inválidas.
 */
  .post('/inicioCliente', postInicioCliente)
  /**
* @openapi
* /api/inicioProfesional:
*   post:
*     summary: Iniciar sesión como profesional.
*     description: Permite a un profesional iniciar sesión en el sistema.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 description: Correo electrónico del profesional.
*               password:
*                 type: string
*                 description: Contraseña del profesional.
*     responses:
*       '200':
*         description: Inicio de sesión exitoso.
*       '401':
*         description: Credenciales inválidas.
*/
  .post('/inicioProfesional', postInicioProfesional)
  /**
  * @openapi
  * /api/registroUsuarios:
  *   post:
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
 * /solicitarProfesionales:
 *   post:
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
 *                 type: string
 *                 description: Nombre de la profesión por la cual filtrar los profesionales.
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
 *                     $ref: '#/components/schemas/Profesional'
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

module.exports = router