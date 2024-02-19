const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
// const { createClient } = require("@libsql/client")

const router = require('./src/rutas/rutas.js')
const { swaggerSpec } = require('./src/rutas/swagger')

const app = express()
const PORT = process.env.PORT || 4321

app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', router)




app.get('/', (req, res) => {
  const htmlResponse = `
  <html>
  <head>
  <title>Servidor corriendo</title>
  </head>
  <body >
  <h1>Servidor corriendo</h1>
  </body>
  </html>
  `
  res.send(htmlResponse)
})

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error('Error al iniciar el servidor:', err);
  } else {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    swaggerDocs(app);
  }
})

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' })
})

// module.exports = { server }