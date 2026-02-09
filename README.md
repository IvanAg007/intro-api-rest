# 📡 Panel de Control IoT – CRUD con MockAPI

Aplicación web desarrollada con **JavaScript Vanilla** que permite realizar operaciones **CRUD (Create, Read, Update, Delete)** sobre dispositivos IoT consumiendo una API REST creada en **MockAPI**.

El proyecto está orientado a fines **académicos**, prácticas de **frontend** y como base para proyectos de **residencia profesional o portafolio**.

---

## 🚀 Demo / API utilizada

API REST (MockAPI):

```
https://698a177bc04d974bc6a1534e.mockapi.io/api/v1/dispositivos_IoT
```

---

## 🧠 Funcionalidades

* ✅ Listar dispositivos IoT desde la API
* ➕ Crear nuevos dispositivos
* ✏️ Editar dispositivos existentes
* 🗑️ Eliminar dispositivos
* 🔁 Actualización automática de datos
* 🧭 Mapeo de direcciones por código
* 🎨 Interfaz moderna tipo dashboard

---

## 🛠️ Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API
* Async / Await
* Bootstrap 5
* MockAPI

---

## 📁 Estructura del proyecto

```
/iot-crud
│── index.html
│── css/
│   └── styles.css
│── js/
│   └── app.js
└── README.md
```

---

## 🧭 Mapeo de direcciones

| Código | Dirección                 |
| -----: | ------------------------- |
|      1 | Adelante                  |
|      2 | Detener                   |
|      3 | Atrás                     |
|      4 | Vuelta derecha adelante   |
|      5 | Vuelta izquierda adelante |
|      6 | Vuelta derecha atrás      |
|      7 | Vuelta izquierda atrás    |
|      8 | Giro 90° derecha          |
|      9 | Giro 90° izquierda        |

---

## ⚙️ Funcionamiento del código

### 📌 URL de la API

```js
const API_URL = 'https://698a177bc04d974bc6a1534e.mockapi.io/api/v1/dispositivos_IoT';
```

---

### 📥 Obtener dispositivos (READ)

```js
async function getDevices() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderTable(data);
}
```

---

### 🖥️ Renderizado en tabla

```js
function renderTable(devices) {
  table.innerHTML = '';
  devices.forEach(d => {
    table.innerHTML += `
      <tr>
        <td>${d.id}</td>
        <td>${d.deviceName}</td>
        <td>${direccionMap[d.direccionCode]}</td>
        <td>${d.ipClient}</td>
        <td>${new Date(d.dateTime).toLocaleString()}</td>
      </tr>`;
  });
}
```

---

### ➕ Crear y ✏️ Actualizar dispositivos (CREATE / UPDATE)

```js
form.addEventListener('submit', async e => {
  e.preventDefault();

  const id = document.getElementById('deviceId').value;

  const device = {
    deviceName: document.getElementById('deviceName').value,
    direccionCode: Number(document.getElementById('direccionCode').value),
    direccionTexto: direccionMap[document.getElementById('direccionCode').value]
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device)
    });
  }

  form.reset();
  getDevices();
});
```

---

### 🗑️ Eliminar dispositivo (DELETE)

```js
window.deleteDevice = async id => {
  if (!confirm('¿Eliminar este dispositivo?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  getDevices();
};
```

---

## ▶️ Cómo ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Abre el archivo `index.html` en tu navegador

> No se requieren dependencias ni servidor local

---

## 🎓 Uso académico

Este proyecto puede utilizarse para:

* Prácticas de JavaScript
* Consumo de APIs REST
* CRUD con Fetch
* Proyectos escolares
* Residencia profesional
* Portafolio frontend

---

## ✨ Posibles mejoras

* Modales Bootstrap
* Toasts de notificación
* Buscador y filtros
* Estados visuales del dispositivo
* Autenticación
* Deploy en GitHub Pages

---

## 👨‍💻 Autor

Desarrollado por **Iván Aguilar Pérez**
Estudiante de Ingeniería en Sistemas Computacionales


