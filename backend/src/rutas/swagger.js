const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

const opciones = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Api de Servicios',
      version: '1.0.0',
    },
  },
  apis: [`${path.join(__dirname, './rutas.js')}`],
}

const swaggerSpec = swaggerJSDoc(opciones)


const swaggerDocs = (app, port) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.use('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
// console.log(swaggerSpec);
// console.log(opciones);
module.exports = { swaggerDocs }