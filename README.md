# Proyecto "Products app"

Este proyecto contiene una aplicación completa desarrollada con NestJS para el backend y React para el frontend, diseñada para la gestión de productos con autenticación JWT, utilizando una dummy API llamada dummy json.

## Configuración y Uso

### Configuración del Proyecto

1. **Clonar el Repositorio**

```bash
   git clone https://github.com/xCrisFlores/products_app.git
   cd products_app
```
2. **Instalar Dependencias**

   - **Backend (NestJS):**
```bash
     cd backend
     npm install
```
   - **Frontend (React):**
```bash
     cd frontend
     npm install
```
### Backend (NestJS)

El backend está desarrollado con NestJS y proporciona endpoints de API para la gestión de productos y autenticación JWT.

#### Estructura del Proyecto

- **AuthModule:** Módulo para la autenticación usando JWT.
- **UsersModule:** Módulo para la gestión de usuarios.
- **AppModule:** Módulo principal que importa los módulos de autenticación y usuarios, y define el controlador principal.
- **AppController:** Controlador que define los endpoints para la gestión de productos.
- **AppService:** Servicio que realiza las operaciones CRUD de productos utilizando Axios para comunicarse con una dummy API.

#### Instalación y Ejecución del Backend

Para ejecutar el servidor:
```bash
cd backend
npm run start
```
El servidor estará disponible en http://localhost:3001.

#### Documentación de la API (Swagger)

Accede a la documentación de la API en http://localhost:3001/api.

### Frontend (React)

El frontend está desarrollado con React y proporciona una interfaz para la gestión de productos, incluyendo autenticación de usuarios.

#### Instalación y Ejecución del Frontend

Para ejecutar la aplicación:
```bash
cd frontend
npm start
```
La aplicación estará disponible en http://localhost:3000.

#### Uso de la Aplicación

- **Inicio de Sesión:**

  La aplicación debería iniciarse luego de ejecutar el comando. Accede con las siguientes credenciales:
  - Usuario: root
  - Contraseña: admin

  También puedes acceder como invitado para obtener acceso limitado a un dashboard donde solo podrás visualizar productos o filtrarlos.

- **Gestión de Productos:**

  Si inicias sesión con las credenciales correctas, accederás a un dashboard con operaciones CRUD completas disponibles. Podrás visualizar todos los productos con una interfaz intuitiva y botones para editar o eliminar cada producto respectivamente.

  - Para editar un producto, presiona el botón amarillo que te dirigirá a una pantalla de edición. Se cargará la información del producto en un formulario editable.

  - Para eliminar un producto, usa el botón rojo. Se mostrará una alerta para confirmar su eliminación.

  - Para agregar un nuevo producto, utiliza el botón morado que te llevará a un formulario similar al de edición. Puedes agregar el producto al hacer clic en el botón correspondiente.

  La interfaz también ofrece funciones de filtrado de productos mediante un slider para especificar rangos y una barra de búsqueda que muestra productos según los términos ingresados. Puedes habilitar estas funciones de filtrado usando el botón de filtro morado.
