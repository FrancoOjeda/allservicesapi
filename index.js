const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { createClient } = require("@libsql/client")

const router = require('./src/rutas/rutas')
const { swaggerDocs } = require('./src/rutas/swagger')


const app = express()
app.disable('x-powered-by')

app.use(cors())

const PORT = process.env.PORT || 4321

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error('Error al iniciar el servidor:', err);
  } else {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    swaggerDocs(app, PORT);
  }
})

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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' })
})

// module.exports = { server }