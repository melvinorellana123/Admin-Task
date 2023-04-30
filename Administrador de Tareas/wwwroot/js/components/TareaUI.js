export function crearTareaUI(tarea) {
    const tareaUI = `
        <div class="tarea card">
            <div class="card-body">
                  <div class="row g-0">
                      <h4 class="card-title col">${tarea.tareaNombre}</h4>
                      <a href="" class="btn btn-warning circulo-eliminar col-auto p-0"></a>
                  </div>
                  <p class="card-text">${tarea.descripcion}</p>
            </div>
        </div> 
     `

    return tareaUI;
}