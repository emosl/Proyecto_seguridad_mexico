# Fundación Por México - Sistema de Gestión de Tickets

Este es el README para el proyecto de la Fundación Por México, que tiene como objetivo crear una aplicación de gestión de tickets para mejorar la administración de aproximadamente 100 aulas donde se brindan servicios educativos innovadores. Esta aplicación ayudará a resolver problemas de control, mantenimiento y seguimiento de incidentes en las aulas, facilitando la comunicación entre los colaboradores y proporcionando información relevante para la toma de decisiones.

## Equipo de Trabajo

- [Martín Palomares](https://github.com/MartinPaGarcia)
- [Fernanda Osorio](https://github.com/FerOsorio08)
- [Emilia Salazar](https://github.com/emosl)
- [Ian Holender](https://github.com/IanHolen)
- [Rafael Blanga]()

## Menú de Navegación

- [Backend](./backend)
  - [data_base](./backend/data_base)
  - [index.js](./backend/index.js)
  - [node_modules](./backend/node_modules)
  - [package-lock.json](./backend/package-lock.json)
  - [package.json](./backend/package.json)

- [Test-admin1](./test-admin1)
  - [README.md](./test-admin1/README.md)
  - [index.html](./test-admin1/index.html)
  - [node_modules](./test-admin1/node_modules)
  - [package-lock.json](./test-admin1/package-lock.json)
  - [package.json](./test-admin1/package.json)
  - [prettier.config.js](./test-admin1/prettier.config.js)
  - [public](./test-admin1/public)
  - [src](./test-admin1/src)
  - [tsconfig.json](./test-admin1/tsconfig.json)
  - [vite.config.ts](./test-admin1/vite.config.ts)
  - [yarn-error.log](./test-admin1/yarn-error.log)

## Problemática a Resolver

La Fundación Por México se enfrenta a varios desafíos en la gestión de sus aulas y la notificación de incidentes:

- La necesidad de proporcionar educación pública de calidad a través de modelos de formación dual.
- La falta de formación en herramientas estadísticas avanzadas y tecnologías computacionales entre los colaboradores.
- La dificultad para llevar un control de incidentes en las aulas de manera presencial.
- La necesidad de obtener métricas y reportes específicos para diferentes roles dentro de la organización.

## Solución Propuesta

La solución propuesta es desarrollar una plataforma de gestión de tickets que permita a los usuarios notificar problemas o incidentes en las aulas. La plataforma se dividirá en tres roles principales: Coordinador de Aula, Coordinador Nacional y Ejecutivo. Cada uno de estos roles tiene funciones específicas:

### Coordinador de Aula
- Notifica incidentes mediante tickets con información detallada.
- Tiene la capacidad de crear tickets y hacer seguimiento de los tickets que ha creado.
- Puede ver los tickets resueltos por el Coordinador Nacional.

### Coordinador Nacional
- Recibe notificaciones sobre los tickets.
- Puede ver todos los tickets creados por los Coordinadores de Aula.
- Tiene la capacidad de marcar los tickets como resueltos.
- Recibe reportes semanales con métricas específicas para la toma de decisiones.

### Ejecutivo
- Recibe reportes semanales que resumen los tickets e incidentes reportados durante la semana.
- Los reportes incluyen estadísticas básicas como promedios, frecuencias y otros datos relevantes.
- Se destacan el aula con más incidentes y las categorías de incidentes más frecuentes.
- Se incluye información sobre anomalías e información de los colaboradores.

## Estructura del Proyecto

El proyecto está estructurado en las siguientes carpetas:

### Backend
- Contiene los archivos relacionados con la lógica del servidor y la base de datos.

### Test-admin1
- Contiene archivos relacionados con la interfaz de usuario y la lógica del cliente.

### Documentación Adicional
- Se recomienda consultar la documentación dentro de cada carpeta para obtener detalles específicos sobre la implementación y el funcionamiento del proyecto.

## Instrucciones de Uso

Para comenzar a utilizar el sistema de gestión de tickets, siga los siguientes pasos:

1. **Configuración del Entorno**
   - Asegúrese de tener Node.js instalado en su sistema.
   - Instale las dependencias necesarias ejecutando `npm install` en las carpetas correspondientes (backend y test-admin1).

2. **Configuración de la Base de Datos**
   - Configure la base de datos de acuerdo con las necesidades del proyecto (consulte la documentación en la carpeta backend/data_base).

3. **Ejecución del Servidor**
   - Inicie el servidor ejecutando `node index.js` en la carpeta backend.

4. **Interfaz de Usuario**
   - Abra la interfaz de usuario ejecutando la aplicación en la carpeta test-admin1.
   - Siga las instrucciones proporcionadas en la documentación de la interfaz para comenzar a utilizar el sistema de gestión de tickets.


## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/es/)
- [MongoDB](https://www.mongodb.com/es)
- [React.js](https://es.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/es/)
- [Babel](https://babeljs.io/)




