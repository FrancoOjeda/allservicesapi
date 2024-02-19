const express = require('express')
const router = express.Router()


const { postRegistroUsuario } = require('../controllers/controladorUsuarios')
const { postInicioCliente, postInicioProfesional } = require('../controllers/controladorInicio')
const { cerrarSesionCliente } = require('../controllers/cerrarSesion')
router

  /**
 * @swagger
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
* @swagger
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
  .post('/inicioProfesional', postInicioProfesional)/**
  * @swagger
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

module.exports = router