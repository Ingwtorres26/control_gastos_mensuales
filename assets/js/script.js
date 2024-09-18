let listaNombreGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];
let filaEdicion = -1;

function capitalizeFirstWord(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    nombreGasto = capitalizeFirstWord(nombreGasto);

    let valorGasto = Number(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    descripcionGasto = capitalizeFirstWord(descripcionGasto);

    if (filaEdicion === -1) {
        listaNombreGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionGastos.push(descripcionGasto);
    } else {
        listaNombreGastos[filaEdicion] = nombreGasto;
        listaValoresGastos[filaEdicion] = valorGasto;
        listaDescripcionGastos[filaEdicion] = descripcionGasto;
        filaEdicion = -1;  // Reset de edición
        document.getElementById('botonFormulario').textContent = 'Agregar Gasto'; // Cambiar el texto del botón de nuevo
    }

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const tablaGastos = document.getElementById('tablaGastos');
    let htmlTabla = `
      <thead>
        <tr>
          <th>Gasto</th>
          <th>Vr Gasto</th>
          <th>Descripción</th>
          <th>Observación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>`;
  
    let totalGastos = 0;
    listaNombreGastos.forEach((elemento, posicion) => {
      const valorGasto = listaValoresGastos[posicion];
      const descripcion = listaDescripcionGastos[posicion];
      const valorRedondeado = Math.round(valorGasto / 50) * 50;
      totalGastos += valorRedondeado;
      let advertencia = '';
      if (valorRedondeado >= 100000) {
        advertencia = 'Advertencia Gasto Excesivo';
      }
  
      htmlTabla += `
        <tr>
          <td>${elemento}</td>
          <td>COL$ ${valorRedondeado.toLocaleString('es-CO')}</td>
          <td>${descripcion}</td>
          <td>${advertencia}</td>
          <td>
            <i class="fas fa-edit icono-editar" title="Editar gasto" onclick="editarGasto(${posicion});" style="cursor: pointer;"></i>
            <i class="fas fa-trash icono-eliminar" title="Eliminar gasto" onclick="eliminarGasto(${posicion});" style="cursor: pointer;"></i>          </td>
        </tr>`;
    });
  
    htmlTabla += `</tbody>`;
  
    document.getElementById('totalGastos').innerHTML = totalGastos.toLocaleString('es-CO');
    tablaGastos.innerHTML = htmlTabla;
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
    document.getElementById('valorGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombreGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function editarGasto(posicion) {
    filaEdicion = posicion;
    document.getElementById('nombreGasto').value = listaNombreGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionGastos[posicion];
    document.getElementById('botonFormulario').textContent = 'Actualizar Gasto'; // Cambiar el texto del botón
}
