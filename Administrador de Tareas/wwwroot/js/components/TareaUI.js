// import {escuchador} from "../util/escuchador";

export function crearTareaUI(tarea, onEditarTarea, onEliminarTarea, onMoverTarea) {
    const tareaHtml = `
        <div class="tarea card " id="${tarea.idTarea}">
            <div class="card-body" id="card-body-${tarea.idTarea}">
                  <div class="row g-0">
                      <h4 id="editarTitulo-${tarea.idTarea}"  tabindex="${tarea.idTarea}"    class="card-title col col-11 editable">${tarea.tareaNombre}</h4>
            
                      <div class="col-1 row align-items-end justify-content-end p-0 m-0">
                            <a href="" tabindex="-1" class="btn btn-danger p-0  circulo-eliminar col col-auto circulo-eliminar-tarea editable"></a>  
                       </div>
                      <p class="card-text editable col col-11"  tabindex="${tarea.idTarea}"   id="editarTextArea-${tarea.idTarea}">${tarea.descripcion}</p>
                  </div>
            
                  
            </div>
        </div> 
     `
    //TODO: ya esta listo el editar solo del lamar al controlador y despues al servicio, lo mismo con el eliminar,
    // mover tarea hay que ver ocmo usar la libreria de drag and drop
    const tareaUI = document.createElement('div');
    tareaUI.innerHTML = tareaHtml;

    const $editarTitulo = tareaUI.querySelector(`#editarTitulo-${tarea.idTarea}`);
    const $editarTextArea = tareaUI.querySelector(`#editarTextArea-${tarea.idTarea}`);

    let editando = false;
    let tituloText;
    let descripcionText;

    tareaUI.querySelector(`#card-body-${tarea.idTarea} `).addEventListener('dblclick', () => {
        hacerEditableAmbos();
    });

    tareaUI.querySelector(`#card-body-${tarea.idTarea} `).addEventListener('keyup', async (e) => {
        tituloText = $editarTitulo.textContent
        descripcionText = $editarTextArea.textContent
        if (
            tituloText === tarea.tareaNombre
            || descripcionText === tarea.descripcion
        ) return;


        if (e.key === 'Enter') {

            console.log($editarTitulo.innerText, $editarTextArea.innerText)
            try {
                onEditarTarea({...tarea, tareaNombre: tituloText, descripcion: descripcionText});
            } catch (e) {
                hacerNoEditableAmbos()
                resetearValores()
            }
        }


        if (e.key === 'Escape') {

            resetearValores();
            hacerNoEditableAmbos();
        }
    });


    document.addEventListener('click', (e) => {
        const elementoTargetId = e.target.id;
        const formElementsIds = [`card-body-${tarea.idTarea}`, `editarTitulo-${tarea.idTarea}`, `editarTextArea-${tarea.idTarea}`]
        const dentroDelForm = formElementsIds.some(id => id === elementoTargetId)

        if (!dentroDelForm) {
            hacerNoEditableAmbos();
            resetearValores();
        }
    });

    function resetearValores() {
        $editarTitulo.textContent = tarea.tareaNombre;
        $editarTextArea.textContent = tarea.descripcion;
    }

    // hacerEditable($editarTitulo, editingTitulo, {...tarea, idLista: tarea.idTarea}, escuchadorEditarTarea);
    // hacerEditable($editarTextArea, editingTextArea, {...tarea, idLista: tarea.idTarea}, escuchadorEditarTarea);
    // onEditarStart($editarTitulo, escuchadorEditarTarea)
    // onEditarStart($editarTextArea, escuchadorEditarTarea)


    function hacerEditableAmbos() {
        $editarTitulo.contentEditable = true;
        $editarTextArea.contentEditable = true;
    }

    function hacerNoEditableAmbos() {
        $editarTitulo.contentEditable = false;
        $editarTextArea.contentEditable = false;
    }
    // escuchador( )


    return tareaUI.firstElementChild;
}