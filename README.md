# BetaPOS Admin APP

Bienvenido al repositorio de **BetaPOS**, una aplicación móvil diseñada para facilitar la gestión del sistema de ventas de manera remota. Con BetaPOS puedes monitorear las transacciones en tiempo real, autorizar acciones mediante tokens, revisar los cierres de caja y gestionar gastos menores.

## Tabla de Contenidos
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Primeros Pasos](#primeros-pasos)

## Descripción del Proyecto
**BetaPOS** es un sistema de ventas dirigido al sector retail que permite a los usuarios:
- Ver los movimientos en tiempo real.
- Dar autorizaciones mediante tokens.
- Revisar cierres de caja.
- Agregar y gestionar gastos menores.

## Características
- **Monitoreo en Tiempo Real**: Mantén un control constante sobre las ventas y transacciones.
- **Autorización mediante Token**: Asegura procesos críticos utilizando autorizaciones tokenizadas.
- **Revisión de Cierres de Caja**: Facilita la auditoría de los cierres de caja diarios.
- **Gestión de Gastos Menores**: Permite la entrada rápida y eficiente de pequeños gastos operativos.

## Tecnologías Utilizadas
- **React Native**: Para el desarrollo de la interfaz móvil.
- **Expo**: Para facilitar el desarrollo y despliegue de la aplicación.
- **TypeScript**: Para añadir tipado estático y mejorar la calidad del código.
- **Zustand**: Para la gestión del estado global de la aplicación.
- **Socket.IO**: Para la comunicación en tiempo real entre el servidor y la aplicación.

## Primeros Pasos

### Requisitos Previos
Asegúrate de tener instalados los siguientes componentes:
- **Node.js** (versión 18.x o superior)
- **npm** o **yarn**
- **Expo CLI**

### Instalación
1. Clona el repositorio:

   ```bash
   git clone https://github.com/ldss95/betapos-mobile
   ```

2. Navega al directorio del proyecto:

   ```bash
    cd betapos-mobile
   ```

3. Instala las dependencias:

   ```bash
    npm install
   ```
4. Configura las variables de entorno creando un archivo .env en la raiz del proyecto:

   ```dotenv
      EXPO_PUBLIC_SENTRY_DSN = https://a1cb3a52d5b53664a7cec612cfdb45f6@o4506014891900928.ingest.sentry.io/4506188176031744
      EXPO_PUBLIC_API_URL = https://api.betapos.com.do
   ```

5. Ejecución de la Aplicación en Desarrollo

   ```bash
    npm start
   ```
