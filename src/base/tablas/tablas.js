// const config = {
// 	url: "libsql://better-thing-francoojeda.turso.io",
// 	authToken: process.env.DB_TOKEN
// }
// const DB = createClient(config)



// const crearTablaUsuarios = async () => {
// 	try {
// 		const usuarios = await DB.execute(`
// 			CREATE TABLE IF NOT EXISTS usuarios (
// 				"usuario_id"	INTEGER,
// 				"nombre"	TEXT NOT NULL,
// 				"apellido"	TEXT NOT NULL,
// 				"email"	TEXT NOT NULL UNIQUE,
// 				"codigo_postal"	TEXT NOT NULL,
// 				"ciudad"	TEXT NOT NULL,
// 				"provincia"	INTEGER NOT NULL,
// 				"estado"	INTEGER NOT NULL DEFAULT 1,
// 				PRIMARY KEY("usuario_id" AUTOINCREMENT)
// 				);
// 				)
// 				`)
// 		console.log("tabla usuarios creada correctamente");
// 	} catch (error) {
// 		console.log("Error al crear tabla usuarios: ", error);
// 	}
// }
// const crearTablaProfesionales = async () => {
// 	try {
// 		const profesionales = await DB.execute(`
// 		CREATE TABLE IF NOT EXISTS "profesionales" (
// 			"profesional_id"	INTEGER,
// 			"usuario_id"	INTEGER,
// 			"disponibilidad_horaria"	TEXT NOT NULL,
// 			"estado"	INTEGER DEFAULT 1,
// 			FOREIGN KEY("usuario_id") REFERENCES "usuarios"("usuario_id"),
// 			PRIMARY KEY("profesional_id")
// 			);
// 			`)
// 		console.log("tabla profesionales creada correctamente");
// 	} catch (error) {
// 		console.log("Error al crear tabla profesionales: ", error);
// 	}
// }
// const crearTablaClientes = async () => {
// 	try {
// 		const clientes = await DB.execute(`
// 		CREATE TABLE IF NOT EXISTS "clientes" (
// 			"cliente_id"	INTEGER,
// 			"usuario_id"	INTEGER,
// 			"direccion"	TEXT NOT NULL,
// 			"estado"	INTEGER DEFAULT 1,
// 			FOREIGN KEY("usuario_id") REFERENCES "usuarios"("usuario_id"),
// 			PRIMARY KEY("cliente_id")
// 			);
// 			`)
// 		console.log("tabla clientes creada correctamente");
// 	} catch (error) {
// 		console.log("Error al crear tabla clientes: ", error);
// 	}
// }
// const crearTablaProfesiones = async () => {
// 	try {
// 		const profesiones = await DB.execute(`
// 		CREATE TABLE IF NOT EXISTS "profesiones" (
// 			"profesion_id"	INTEGER,
// 			"nombre"	TEXT NOT NULL,
// 			"descripcion"	TEXT NOT NULL,
// 			PRIMARY KEY("profesion_id")
// 			);
// 			`)
// 		console.log("tabla profesiones creada correctamente");
// 	} catch (error) {
// 		console.log("Error al crear tabla profesiones: ", error);
// 	}
// }

// const crearTablaProfesionalProfesiones = async () => {
// 	try {
// 		const profesional_profesiones = await DB.execute(`
// 		CREATE TABLE IF NOT EXISTS "profesional_profesiones" (
// 			"profesional_id"	INTEGER,
// 			"profesion_id"	INTEGER,
// 			"fecha_alta"	TEXT NOT NULL,
// 			FOREIGN KEY("profesion_id") REFERENCES "profesiones"("profesion_id"),
// 			FOREIGN KEY("profesional_id") REFERENCES "profesionales"("profesional_id"),
// 			PRIMARY KEY("profesional_id","profesion_id")
// 			);
// 			`)
// 		console.log("tabla profesional_profesiones creada correctamente");
// 	} catch (error) {
// 		console.log("Error al crear tabla profesional_profesiones: ", error);
// 	}
// }
// const crearTablaClienteProfesionalReseña = async () => {
// 	try {
// 		const cliente_profesional_reseña = await DB.execute(`
// 		CREATE TABLE IF NOT EXISTS "cliente_profesional_reseña" (
// 			"reseña_id"	INTEGER,
// 			"cliente_id"	INTEGER,
// 			"profesional_id"	INTEGER,
// 			"contenido"	TEXT,
// 			"calificacion"	INTEGER,
// 			"fecha"	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// 			FOREIGN KEY("profesional_id") REFERENCES "profesionales"("profesional_id"),
// 			FOREIGN KEY("cliente_id") REFERENCES "clientes"("usuario_id"),
// 			UNIQUE("cliente_id","profesional_id"),
// 			PRIMARY KEY("reseña_id" AUTOINCREMENT)
// 			);`
// 		)
// 		console.log("tabla cliente_profesional_reseña creada correctamente");
// 	} catch (error) {
// 		console.log("Error al crear tabla cliente_profesional_reseña: ", error);
// 	}
// }
// const crearTablaProfesionalClienteReseña = async () => {
// 	try {
// 		const profesional_cliente_reseña = await DB.execute(`
// 		CREATE TABLE IF NOT EXISTS "profesional_cliente_reseña" (
// 			"reseña_id"	INTEGER,
// 			"profesional_id"	INTEGER,
// 			"cliente_id"	INTEGER,
// 			"contenido"	TEXT,
// 			"calificacion"	INTEGER,
// 			"fecha"	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// 			FOREIGN KEY("cliente_id") REFERENCES "clientes"("usuario_id"),
// 			FOREIGN KEY("profesional_id") REFERENCES "profesionales"("profesional_id"),
// 			UNIQUE("profesional_id","cliente_id"),
// 			PRIMARY KEY("reseña_id" AUTOINCREMENT)
// 			);
// 			`)
// 		console.log("tabla profesional_cliente_reseña creada correctamente");
// 	} catch (error) {
// 		console.log("Error al crear tabla profesional_cliente_reseña: ", error);
// 	}
// }

// module.exports = DB

