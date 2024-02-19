// MySql

// const mysql = require('mysql')
// const conexion = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'allservicesapi'
// })
// conexion.connect((err) => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log("Conectado a la DB");
//   }
// })


// conexion.query("CREATE TABLE IF NOT EXISTS usuarios (" +
//   "usuario_id INT AUTO_INCREMENT PRIMARY KEY," +
//   "nombre VARCHAR(255) NOT NULL," +
//   "apellido VARCHAR(255) NOT NULL," +
//   "email VARCHAR(255) NOT NULL UNIQUE," +
//   "codigo_postal VARCHAR(10) NOT NULL," +
//   "ciudad VARCHAR(255) NOT NULL," +
//   "provincia VARCHAR(255) NOT NULL," +
//   "estado INT NOT NULL DEFAULT 1" +
//   ")", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("tabla creada usuarios correctamente");
//     }
//   });


// conexion.query("CREATE TABLE IF NOT EXISTS profesionales (" +
//   "profesional_id INT AUTO_INCREMENT PRIMARY KEY," +
//   "usuario_id INT," +
//   "disponibilidad_horaria TEXT NOT NULL," +
//   "estado INT DEFAULT 1," +
//   "FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)" +
//   ")", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("tabla creada profesionales correctamente");
//     }
//   });


// conexion.query("CREATE TABLE IF NOT EXISTS clientes (" +
//   "cliente_id INT AUTO_INCREMENT PRIMARY KEY," +
//   "usuario_id INT," +
//   "direccion TEXT NOT NULL," +
//   "estado INT DEFAULT 1," +
//   "FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)" +
//   ")", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("tabla creada clientes correctamente");
//     }
//   });

// conexion.query("CREATE TABLE IF NOT EXISTS profesiones (" +
//   "profesion_id INT AUTO_INCREMENT PRIMARY KEY," +
//   "nombre VARCHAR(255) NOT NULL," +
//   "descripcion TEXT NOT NULL" +
//   ")", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Tabla profesiones creada correctamente");
//     }
//   });


// conexion.query(
//   "CREATE TABLE IF NOT EXISTS profesional_profesiones (" +
//   "profesional_id INT," +
//   "profesion_id INT," +
//   "fecha_alta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
//   "FOREIGN KEY (profesional_id) REFERENCES profesionales (profesional_id)," +
//   "FOREIGN KEY (profesion_id) REFERENCES profesiones (profesion_id)," +
//   "PRIMARY KEY (profesional_id, profesion_id)" +
//   ")", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("tabla creada profesional_profesiones correctamente");
//     }
//   }
// )
// conexion.query("CREATE TABLE IF NOT EXISTS cliente_profesional_reseña (" +
//   "reseña_id INT AUTO_INCREMENT PRIMARY KEY," +
//   "cliente_id INT," +
//   "profesional_id INT," +
//   "contenido TEXT," +
//   "calificacion INT," +
//   "fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
//   "FOREIGN KEY(cliente_id) REFERENCES clientes(usuario_id)," +
//   "FOREIGN KEY(profesional_id) REFERENCES profesionales(profesional_id)," +
//   "UNIQUE(cliente_id, profesional_id)" +
//   ")", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Tabla cliente_profesional_reseña creada correctamente");
//     }
//   });

// conexion.query("CREATE TABLE IF NOT EXISTS profesional_cliente_reseña (" +
//   "reseña_id INT AUTO_INCREMENT PRIMARY KEY," +
//   "profesional_id INT," +
//   "cliente_id INT," +
//   "contenido TEXT," +
//   "calificacion INT," +
//   "fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
//   "FOREIGN KEY(profesional_id) REFERENCES profesionales(profesional_id)," +
//   "FOREIGN KEY(cliente_id) REFERENCES clientes(usuario_id)," +
//   "UNIQUE(profesional_id, cliente_id)" +
//   ")", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Tabla profesional_cliente_reseña creada correctamente");
//     }
//   });


// conexion.end()

// SQLITE3
// const sqlite3 = require('sqlite3').verbose()
// const path = require('path')


// const db_name = path.join(__dirname, 'nuevaDB.db')
// const baseDeDatos = new sqlite3.Database(db_name, (err) => {
//   if (err) {
//     return console.error(err.message)
//   } else {
//     console.log("Conexion exitosa con la DB");
//   }
// })
// module.exports = {
//   baseDeDatos,
// }