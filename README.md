# Proyecto `ejemplo_reportes`

Este proyecto está desarrollado utilizando Node.js v20.15.0.

## Resumen de la Arquitectura

El proyecto sigue una [arquitectura basada en hexágonos con vertical slicing](https://medium.com/@jjmayorgaq/clean-architecture-architecture-hexagonal-8f6d45c5039a), lo que permite una separación clara de responsabilidades y facilita la escalabilidad. A continuación, se detalla la estructura principal:

- **Servicios**: Cada funcionalidad principal del sistema (como `report`) tiene su propio directorio dentro de `src/services`. Cada servicio incluye:
  - Controladores (`controllers/*.controller.ts`): Implementa la lógica de negocio, como la generación de reportes en XLSX y PDF.
- **Capa de Configuración**: El directorio `src/config` contiene archivos para configuraciones específicas del entorno y para la documentación de API con Swagger.
- **Capa de Pruebas**: `__tests__` contiene las pruebas unitarias y de integración del proyecto.

### Estructura de Carpetas

```
ejemplo_reportes
└───src
    │   app.ts
    │   server.ts
    ├───config
    ├───services
    │   ├───report
    │   │   ├───controllers
    └───__tests__
```

## Ambiente Local
### Dependencias
- Node.js v20.15.0
### Instalación
Ejecuta el siguiente comando
```
npm install
```
### Ejecucion
```
npm run dev
```

Una vez se ecuentre en ejecución puede encontrar la documentacion de los endpoints en:
```
http://localhost:3000/api-docs/#/
```

### Pruebas Unitarias
Ejecuta el siguiente comando
```
npm run test
```
Puedes encontrar el reporte de coverage en la siguiente ubicacion:
```
./ejemplo_reportes/coverage/lcov-report/index.html
```

## Autor
Alex Réne López Rosa