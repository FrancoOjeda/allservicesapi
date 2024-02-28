const { config } = require('dotenv')
config()
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || '37Franco57#'
const DATABASE = process.env.DATABASE || 'allservicesapi'
const DB_PORT = process.env.DB_PORT || 3306
module.exports = {
  DB_HOST, DB_USER, DB_PASSWORD, DATABASE, DB_PORT
}