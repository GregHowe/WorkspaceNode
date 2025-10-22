# 🧭 Sistema de Gestión de Reservas — Backend + Frontend + IoT

Este proyecto resuelve la prueba técnica de **Darien Technology** para la gestión de reservas en espacios de coworking. Incluye:

- 📘 Backend en Node.js con TypeORM y MySQL  
- 💻 Frontend en React con consumo de API protegida por API Key  
- 📡 Bonus IoT con integración MQTT para telemetría en tiempo real  


---

## 📁 Estructura del repositorio

```markdown
coworking-reservas/ 
├── backend/ → API REST con lógica de negocio y telemetría 
├── frontend/ → Interfaz React para clientes y administradores
```

---

## 🚀 Instalación y ejecución

### 🔧 Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/coworking-reservas.git
cd coworking-reservas
```

📘 Backend
```
cd backend
npm install
```

```
Crear archivo .env con:
```
PORT=8181
API_KEY=mi_api_key_valida
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=coworking
```

Ejecutar en desarrollo:
```npm run dev```

Ejecutar pruebas:
```npm run test```

Incluye:

    ✅ Test unitario: validación de límite semanal

    ✅ Test de integración: listado de reservas con paginación


💻 Frontend
```
cd ../frontend
npm install
```

Crear archivo .env con:
VITE_API_URL=http://localhost:8181
VITE_API_KEY=mi_api_key_valida

Ejecutar en desarrollo:
npm run dev


🧩 Funcionalidades implementadas

    Listado de espacios disponibles

    Listado de reservas con paginación

    Creación y eliminación de reservas

    Detalle de espacio

    Validación de formularios

    Manejo de errores con retroalimentación al usuario

    Autenticación por API Key

    Restricción de máximo 3 reservas por semana por cliente

    Prevención de conflictos de horario

    Dashboard en tiempo real para administradores (bonus IoT)



📡 Bonus IoT
```
El backend y frontend están conectados al tópico MQTT:
sites/SITE_A/offices/OFFICE_1/telemetry
```
Se procesan y visualizan los siguientes datos:

    Ocupación

    Nivel de CO₂

    Temperatura

    Humedad

    Nivel de batería




🧠 Uso de Inteligencia Artificial
```
Se utilizó IA como herramienta puntual para:

    Generar ejemplos de pruebas

    Diagnosticar errores comunes

    Formatear documentación

    Sugerir estructura modular

Todas las decisiones de arquitectura, lógica y validaciones fueron diseñadas manualmente. Ver archivo backend/IA.md para más detalles.
```


🐳 Docker (opcional)
```

Si deseas levantar el proyecto con contenedores:

docker-compose up
```

✅ Requisitos cumplidos

    Arquitectura modular con separación de responsabilidades

    Base de datos relacional con ORM

    Autenticación por API Key

    Pruebas unitarias e integración

    Documentación clara

    Bonus IoT implementado

    Frontend funcional con React

🕒 Tiempo de desarrollo
```

Este proyecto fue desarrollado en 4 días, cumpliendo el plazo establecido por la prueba técnica.
``` 
