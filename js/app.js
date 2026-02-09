const API_URL = 'https://698a177bc04d974bc6a1534e.mockapi.io/api/v1/dispositivos_IoT';


const form = document.getElementById('deviceForm');
const table = document.getElementById('devicesTable');


const direccionMap = {
1: 'Adelante',
2: 'Detener',
3: 'Atrás',
4: 'Vuelta derecha adelante',
5: 'Vuelta izquierda adelante',
6: 'Vuelta derecha atrás',
7: 'Vuelta izquierda atrás',
8: 'Giro 90° derecha',
9: 'Giro 90° izquierda'
};


async function getDevices() {
const res = await fetch(API_URL);
const data = await res.json();
renderTable(data);
}


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
<td>
<button class="btn btn-sm btn-warning me-2" onclick='editDevice(${JSON.stringify(d)})'>Editar</button>
<button class="btn btn-sm btn-danger" onclick='deleteDevice(${d.id})'>Eliminar</button>
</td>
</tr>`;
});
}


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


window.editDevice = device => {
document.getElementById('deviceId').value = device.id;
document.getElementById('deviceName').value = device.deviceName;
document.getElementById('direccionCode').value = device.direccionCode;
};


window.deleteDevice = async id => {
if (!confirm('¿Eliminar este dispositivo?'))return;
await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
getDevices();
};


getDevices();