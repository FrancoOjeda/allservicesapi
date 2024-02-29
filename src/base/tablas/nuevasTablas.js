
// CREATE TABLE IF NOT EXISTS usuarios(
//   usuario_id INT AUTO_INCREMENT PRIMARY KEY,
//   nombre TEXT NOT NULL,
//   apellido TEXT NOT NULL,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   codigo_postal TEXT NOT NULL,
//   ciudad TEXT NOT NULL,
//   provincia TEXT NOT NULL,
//   estado INT NOT NULL DEFAULT 1
// );

// CREATE TABLE IF NOT EXISTS profesionales(
//   profesional_id INT AUTO_INCREMENT PRIMARY KEY,
//   usuario_id INT,
//   disponibilidad_horaria TEXT NOT NULL,
//   estado INT DEFAULT 1,
//   FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)
// );
// CREATE TABLE IF NOT EXISTS clientes(
//   cliente_id INT AUTO_INCREMENT PRIMARY KEY,
//   usuario_id INT,
//   direccion TEXT NOT NULL,
//   estado INT DEFAULT 1,
//   FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)
// );
// CREATE TABLE IF NOT EXISTS profesiones(
//   profesion_id INT AUTO_INCREMENT PRIMARY KEY,
//   nombre TEXT NOT NULL,
//   descripcion TEXT NOT NULL
// );
// CREATE TABLE IF NOT EXISTS profesional_profesiones(
//   profesional_id INT,
//   profesion_id INT,
//   fecha_alta TEXT NOT NULL,
//   FOREIGN KEY(profesion_id) REFERENCES profesiones(profesion_id),
//   FOREIGN KEY(profesional_id) REFERENCES profesionales(profesional_id),
//   PRIMARY KEY(profesional_id, profesion_id)
// );
// CREATE TABLE IF NOT EXISTS cliente_profesional_reseña(
//   reseña_id INT AUTO_INCREMENT PRIMARY KEY,
//   cliente_id INT,
//   profesional_id INT,
//   contenido TEXT,
//   calificacion INT,
//   fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY(profesional_id) REFERENCES profesionales(profesional_id),
//   FOREIGN KEY(cliente_id) REFERENCES clientes(usuario_id),
//   UNIQUE(cliente_id, profesional_id)
// );

// CREATE TABLE IF NOT EXISTS profesional_cliente_reseña(
//   reseña_id INT AUTO_INCREMENT PRIMARY KEY,
//   profesional_id INT,
//   cliente_id INT,
//   contenido TEXT,
//   calificacion INT,
//   fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY(cliente_id) REFERENCES clientes(usuario_id),
//   FOREIGN KEY(profesional_id) REFERENCES profesionales(profesional_id),
//   UNIQUE(profesional_id, cliente_id)
// );
