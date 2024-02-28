// ESTE ARCHIVO CORRESPONDE A LA NUEVA BASE DE DATOS DE MYSQL

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DATABASE
} = require('../../config')
const { createPool } = require('mysql2/promise')


const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
  port: DB_PORT
})

module.exports = { pool }