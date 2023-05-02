// import {escuchador} from "../util/escuchador";

import {escuchador} from "../util/escuchador.js";

export function crearTareaUI(tarea, onEditarTarea, onEliminarTarea ) {
    const tareaHtml = `
        <div class="tarea card " id="tarea-${tarea.idTarea}">
            <div class="card-body" id="card-body-${tarea.idTarea}">
                  <div class="row g-0">
                      <h4 id="editarTitulo-${tarea.idTarea}"  tabindex="${tarea.idTarea}"    class="card-title col col-11 editable">${tarea.tareaNombre}</h4>
            
                      <div class="col-1 row align-items-end justify-content-end p-0 m-0">
                            <a  tabindex="-1" id="btnBorrar" class="btn btn-danger p-0  circulo-eliminar col col-auto circulo-eliminar-tarea editable"></a>  
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
    const $btnBorrar = tareaUI.querySelector('#btnBorrar')

    let tituloText = tarea.tareaNombre;
    let descripcionText = tarea.descripcion;
    let nuevoTitulo
    let nuavaDescripcion

    tareaUI.querySelector(`#card-body-${tarea.idTarea} `).addEventListener('dblclick', () => {
        hacerEditableAmbos();
    });


    async function onBorrarTarea() {
        await onEliminarTarea(tarea)
    }

    escuchador($btnBorrar, onBorrarTarea)


    let editado = false

    function onPresionarEnter(e) {
        nuevoTitulo = $editarTitulo.innerText
        nuavaDescripcion = $editarTextArea.innerText

        const sinCambios = nuevoTitulo === tituloText && nuavaDescripcion === descripcionText
        if (sinCambios) {
            return
        }

        if (!nuevoTitulo.length > 0 || !nuavaDescripcion.length > 0) {
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault()
            editado = true
            nuevoTitulo = nuevoTitulo.trim()
            nuavaDescripcion = nuavaDescripcion.trim()
            try {
                onEditarTarea({...tarea, tareaNombre: nuevoTitulo, descripcion: nuavaDescripcion});
                hacerNoEditableAmbos()
                $editarTitulo.innerText = nuevoTitulo
                $editarTextArea.innerText = nuavaDescripcion
                return;
            } catch (e) {
                hacerNoEditableAmbos()
                resetearValores()
            }
        }

        if (e.key === 'Escape') {
            resetearValores();
            hacerNoEditableAmbos();
        }
    }


    escuchador($editarTitulo, onPresionarEnter, 'keyup')
    escuchador($editarTextArea, onPresionarEnter, 'keyup')


    document.addEventListener('click', (e) => {
        const elementoTargetId = e.target.id;
        const formElementsIds = [`card-body-${tarea.idTarea}`, `editarTitulo-${tarea.idTarea}`, `editarTextArea-${tarea.idTarea}`]
        const dentroDelForm = formElementsIds.some(id => id === elementoTargetId)

        if (!dentroDelForm && !editado) {
            editado = false;
            hacerNoEditableAmbos();
            resetearValores();
        }
    });

    function resetearValores() {
        $editarTitulo.textContent = tarea.tareaNombre;
        $editarTextArea.textContent = tarea.descripcion;
    }


    function hacerEditableAmbos() {
        $editarTitulo.contentEditable = true;
        $editarTextArea.contentEditable = true;
        $editarTitulo.focus();
    }

    function hacerNoEditableAmbos() {
        $editarTitulo.contentEditable = false;
        $editarTextArea.contentEditable = false;
    }


    return tareaUI.firstElementChild;
}