# 📘 Sistema de Gestión de Reservas (Backend)

## 🧩 Descripción del Proyecto

API RESTful desarrollada en Node.js para gestionar reservas en espacios de coworking. Permite a los clientes reservar salas o áreas de trabajo, valida conflictos de horario y límites semanales, y se integra con telemetría IoT.

---

## 🚀 Tecnologías Utilizadas

- Node.js + Express
- TypeScript
- TypeORM + MySQL
- MQTT (bonus IoT)
- Jest + Supertest (pruebas)
- Dotenv (variables de entorno)

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
cd nombre-del-repo/backend
npm install
```

---

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del backend con:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Jumpstart0!
DB_NAME=workspace_db

API_KEY=tu_api_key_valida

MQTT_URL=mqtt://localhost:1883
MQTT_TOPIC=sites/SITE_A/offices/OFFICE_1/telemetry
```

---

## 🧪 Ejecución de Pruebas

```bash
npm test
```

Incluye:

- ✅ Test unitario: `checkWeeklyLimit`
- ✅ Test de integración: `GET /reservas`

---

## 📡 Endpoints Principales

| Método | Ruta                  | Descripción                        |
|--------|-----------------------|------------------------------------|
| GET    | `/espacios`           | Lista todos los espacios           |
| POST   | `/reservas`           | Crea una nueva reserva             |
| GET    | `/reservas?page=1`    | Lista reservas con paginación      |
| DELETE | `/lugares/:id`        | Elimina un lugar específico        |

🔐 Todos los endpoints requieren el header:  
`x-api-key: tu_api_key_valida`

---

## 🧠 Reglas de Negocio

- Un cliente no puede reservar dos espacios en conflicto horario.
- Máximo 3 reservas por semana por cliente.
- Validación automática vía `checkOverlap` y `checkWeeklyLimit`.

---

## 📡 Bonus IoT

- Suscripción al tópico MQTT:  
  `sites/SITE_A/offices/OFFICE_1/telemetry`
- Procesamiento de datos de sensores: CO₂, temperatura, ocupación, batería.