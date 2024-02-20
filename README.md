# Template de Servidor Express y Sequelize

Este es un template básico para un servidor Express con sequelize con configuraciones comunes. Utiliza las siguientes librerías:

* cors (v2.8.5): Middleware para permitir solicitudes HTTP desde diferentes dominios.

* dotenv (v16.3.2): Carga variables de entorno desde un archivo .env.

* express (v4.18.2): Marco web minimalista para la construcción de aplicaciones web y API.

* helmet (v7.1.0): Middleware que ayuda a proteger las aplicaciones Express configurando varios encabezados HTTP.

* pg (v8.11.3): Controlador de PostgreSQL para Node.js.

* pg-hstore (v2.3.4): Serializador/deserializador para datos JSON y hstore en PostgreSQL.

* sequelize (v6.35.2): ORM para interactuar con bases de datos relacionales.


## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/Generacion-32/exp-sq-g32.git <NOMBRE_DEL_PROYECTO>
cd <NOMBRE_DEL_PROYECTO>

```
2. Tambien puedes hacerlo con el siguiente comando

```
npx exp-sq-g32
```

## Uso

>Para usar este template debes contar o crear una base de datos.

### Modo de Desarrollo

Para ejecutar el servidor en modo de desarrollo, utiliza:

```
npm run dev
```
Esto iniciará el servidor con Nodemon, que reiniciará automáticamente la aplicación cuando detecte cambios en el código.

## Modo de Producción

Para ejecutar el servidor en modo de producción, utiliza:

```
npm start
```

Este comando ejecutará la aplicación en un entorno de producción.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias para mejorar el template, no dudes en comunicarla.

## Licencia
Este proyecto está bajo la Licencia ISC 


