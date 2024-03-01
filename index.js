const swaggerJSDoc = require('swagger-jsdoc')
const express = require('express')
const cors = require('cors')
const hbs = require('express-handlebars')
const path = require('path')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
// const { autorizarUsuario } = require('./src/autorizacion/autorizarUsuario.js')

// const { createClient } = require("@libsql/client")

const router = require('./src/rutas/rutas.js')
// const { swaggerSpec } = require('./src/rutas/swagger')

const app = express()
const PORT = process.env.PORT || 4321


// Handlebars-Config
app.engine('hbs', hbs.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))
// Server-config
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', router)

// Swagger config

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


app.get('/', (req, res) => {
  res.render('home')
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error('Error al iniciar el servidor:', err);
  } else {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
  }
})

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' })
})

module.exports = { server }