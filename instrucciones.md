# Pasos para desplegar el backend

## Primero:

Hay que abrir los dos proyectos, tanto el front como el backend en vscode, por separado, ya que vas a necesitar dos consolas.

## Segundo:
El proyecto del front seguramente utiliza el puerto 3000, mientras que el backend lo setee en 4321. Por lo tanto, no deberia haber problemas con incompatibilidad. Te moves a la carpeta backend, e instalas todas las dependencias con npm install

## Tercero:
Tenes que crear un archivo .env, en el que declaras la variable "DB_TOKEN", con el valor que pasaré por whatsapp. Sin esta variable, no vas a tener acceso a la base de datos

## Cuarto:
Usando el comando "npm run dev", desplegas el proyecto en local, y verás en la consola el mensaje "Servidor ejecutándose en http://localhost:4321". Esa ruta es la que copias en el fetch desde el front.

## Quinto:
Le agregas a la ruta los endpoint a los que quieras acceder, por ejemplo /api/inicioCliente, para iniciar sesion, y le mandas para adelante. En caso de recibir algun error a pesar de hacerlo correctamente, contactame y lo resolvemos.

# ¡Muchos exitos!