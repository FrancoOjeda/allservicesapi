require('dotenv').config()
const { createClient } = require("@libsql/client")


const DB = createClient({
	url: "libsql://wealthy-doctor-mindbender-francoojeda.turso.io",
	authToken: process.env.DB_TOKEN
})


DB.execute(`
CREATE TABLE IF NOT EXISTS usuarios (
    "usuario_id"	INTEGER,
    "nombre"	TEXT NOT NULL,
    "apellido"	TEXT NOT NULL,
    "email"	TEXT NOT NULL UNIQUE,
    "codigo_postal"	TEXT NOT NULL,
    "ciudad"	TEXT NOT NULL,
    "provincia"	INTEGER NOT NULL,
    "estado"	INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY("usuario_id" AUTOINCREMENT)
  );
)
`)

DB.execute(`
CREATE TABLE IF NOT EXISTS "profesionales" (
	"profesional_id"	INTEGER,
	"usuario_id"	INTEGER,
	"disponibilidad_horaria"	TEXT NOT NULL,
	"estado"	INTEGER DEFAULT 1,
	FOREIGN KEY("usuario_id") REFERENCES "usuarios"("usuario_id"),
	PRIMARY KEY("profesional_id")
);
`)

DB.execute(`
CREATE TABLE IF NOT EXISTS "clientes" (
	"cliente_id"	INTEGER,
	"usuario_id"	INTEGER,
	"direccion"	TEXT NOT NULL,
	"estado"	INTEGER DEFAULT 1,
	FOREIGN KEY("usuario_id") REFERENCES "usuarios"("usuario_id"),
	PRIMARY KEY("cliente_id")
);
`)

DB.execute(`
CREATE TABLE IF NOT EXISTS "profesiones" (
	"profesion_id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"descripcion"	TEXT NOT NULL,
	PRIMARY KEY("profesion_id")
);
`)
DB.execute(`
CREATE TABLE IF NOT EXISTS "profesional_profesiones" (
	"profesional_id"	INTEGER,
	"profesion_id"	INTEGER,
	"fecha_alta"	TEXT NOT NULL,
	FOREIGN KEY("profesion_id") REFERENCES "profesiones"("profesion_id"),
	FOREIGN KEY("profesional_id") REFERENCES "profesionales"("profesional_id"),
	PRIMARY KEY("profesional_id","profesion_id")
);
`)
DB.execute(`
CREATE TABLE IF NOT EXISTS "cliente_profesional_reseña" (
	"reseña_id"	INTEGER,
	"cliente_id"	INTEGER,
	"profesional_id"	INTEGER,
	"contenido"	TEXT,
	"calificacion"	INTEGER,
	"fecha"	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("profesional_id") REFERENCES "profesionales"("profesional_id"),
	FOREIGN KEY("cliente_id") REFERENCES "clientes"("usuario_id"),
	UNIQUE("cliente_id","profesional_id"),
	PRIMARY KEY("reseña_id" AUTOINCREMENT)
);`
)

DB.execute(`
CREATE TABLE IF NOT EXISTS "profesional_cliente_reseña" (
	"reseña_id"	INTEGER,
	"profesional_id"	INTEGER,
	"cliente_id"	INTEGER,
	"contenido"	TEXT,
	"calificacion"	INTEGER,
	"fecha"	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("cliente_id") REFERENCES "clientes"("usuario_id"),
	FOREIGN KEY("profesional_id") REFERENCES "profesionales"("profesional_id"),
	UNIQUE("profesional_id","cliente_id"),
	PRIMARY KEY("reseña_id" AUTOINCREMENT)
);
`)

module.exports = DB