const apiUrl = 'https://sheet.best/api/sheets/8d321355-3aff-4a21-b391-721682e24a9b';

// Captura el formulario
const form = document.getElementById('crudForm');
const dataTable = document.getElementById('dataTable');

// Función para obtener y mostrar los datos en la tabla
const getData = async () => {
    try {
        const response = await axios.get(apiUrl);
        renderTable(response.data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

// Función para renderizar los datos en la tabla
const renderTable = (data) => {
    console.log(data)
    dataTable.innerHTML = '';
    data.forEach((item) => {
        const row = `<tr class="border-b">
            <td class="py-2 px-4">${item.Nombre}</td>
            <td class="py-2 px-4">${item.Correo}</td>
            <td class="py-2 px-4">${item.Telefono}</td>
            <td class="py-2 px-4"><img src="${item.img}" alt="img" class="w-16 h-16 object-cover rounded"></td>
            <td class="py-2 px-4">
                <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editData('${item.Nombre}')">Editar</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteData('${item.Nombre}')">Eliminar</button>
            </td>
        </tr>`;
        dataTable.insertAdjacentHTML('beforeend', row);
    });
};

// Crear o actualizar un registro al enviar el formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const img = document.getElementById('img').value;

    const data = { Nombre: nombre, Correo: correo, Telefono: telefono, img };

    try {
        // Verifica si existe el registro por nombre
        const response = await axios.get(`${apiUrl}/Nombre/${nombre}`);
        if (response.data.length) {
            // Si existe, actualiza el registro
            await axios.put(`${apiUrl}/Nombre/${nombre}`, data);
            console.log('Registro actualizado');
        } else {
            // Si no existe, lo crea
            await axios.post(apiUrl, data);
            console.log('Registro creado');
        }
        form.reset();
        getData(); // Actualiza la tabla después de la operación
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
});

// Función para eliminar un registro
const deleteData = async (nombre) => {
    try {
        await axios.delete(`${apiUrl}/Nombre/${nombre}`);
        console.log('Registro eliminado');
        getData(); // Actualiza la tabla después de eliminar
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
    }
};

// Función para cargar datos en el formulario para editar
const editData = (nombre) => {
    axios.get(`${apiUrl}/Nombre/${nombre}`).then(response => {
        const data = response.data[0];
        document.getElementById('nombre').value = data.Nombre;
        document.getElementById('correo').value = data.Correo;
        document.getElementById('telefono').value = data.Telefono;
        document.getElementById('img').value = data.img;
    });
};

// Llama a la función para cargar y mostrar los datos al cargar la página
getData();
