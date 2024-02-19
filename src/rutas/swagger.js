const swaggerJSDoc = require('swagger-jsdoc')
// const swaggerUi = require('swagger-ui-express')
const path = require('path')

const opciones = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Api de Servicios',
      version: '1.0.0',
    },
  },
  apis: ['./src/rutas/rutas*.js'],
}

const swaggerSpec = swaggerJSDoc(opciones)

// const swaggerDocs = (app, port) => {
//   app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//   app.use('/api/docs.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.send(swaggerSpec)
//   })
// }

module.exports = { swaggerSpec }
