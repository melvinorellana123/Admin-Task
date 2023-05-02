import {hacerEditable} from "../util/hacerEditable.js";
import {escuchador} from "../util/escuchador.js";

export function crearLista(lista, onDelete, onEdit, onCrearNuevaTarea, tareaUi) {
    const tareas = lista.tareas?.map(tareaUi) ?? 'No hay tareas';
    let listaNombre = lista.listaNombre;

    const listaTitulo = document.createElement('h3');
    listaTitulo.id = "tituloTextoLista";
    listaTitulo.innerText = listaNombre;

    const listaTituloEdit = document.createElement('input');
    listaTituloEdit.id = "inputEditLista";
    listaTituloEdit.type = "text";
    listaTituloEdit.className = "form-control col-auto";

    const listaHtmlText = `
        <div class="lista glasmorfisify col-4 " id="lista-${lista.idLista}">
            <div class="justify-content-between row p-3 align-items-center">
                <span class="col"> 
                   <h3 id="listaNombreEditable" class="editable">${listaNombre}</h3>
                </span>
                <div class="col-2">
                    <div class="row flex-nowrap gap-2 justify-content-end">
                        <span id="deleteButton" class="col-autop-0 icono-basurero" style="cursor: pointer;" >
                          <img src="Images/borrar.png" width="20px">
                        </span>
                    </div>
                </div>
            </div>
            <div class="col gap-2">
                <div class="col gap-2 ">

                <div class="row justify-content-end p-2">
                    <button
                        class="btn btn-light col-12 boton-crear-seccion"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#myCollapseTarea-${lista.idLista}"
                        aria-expanded="false"
                        aria-controls="collapseExample">
                        Nueva Tarea
                    </button>
                </div>

                <div class="row collapse g-2 mt-2" id="myCollapseTarea-${lista.idLista}">
                    <div class="col-8">
                        <input  id="tituloTarea" class="form-control" type="text" placeholder="Nombre de la nueva tarea" aria-label="crear tablero">
                    </div>
                    <div class="col-4">
                        <button
                            type="button"
                            class=" btn text-light boton-crear-lista w-100 col-6"
                            id="btnCrearTarea"
                            >
                            Crear
                        </button>
                    </div>
                         <div class="form-floating">
                         <textarea  class="form-control" placeholder="Descripción" id="floatingTextarea"></textarea>
                         <label for="floatingTextarea">Descripción</label>
                    </div>
                    </div>
               </div> 
                <span id="tareas-${lista.idLista}"  class="row gap-2 mt-1 tareas" >
                 ${tareas}
                </span>
            </div>
        </div>
`

    const $lista = document.createElement('div');
    $lista.innerHTML = listaHtmlText;


    //----------------------------------------------
    // insertar las  tareas como nodos
    //----------------------------------------------

    const $tareasContenedor = $lista.querySelector(`#tareas-${lista.idLista}`);

    $tareasContenedor.innerHTML = '';
    $tareasContenedor.append(...tareas);

    //----------------------------------------------//


    // _----------------------------------------------------------
    //Obtener datos de tarea
    const tituloTarea = $lista.querySelector('#tituloTarea');
    const descripcionTarea = $lista.querySelector('#floatingTextarea');
    //Crear tarea
    const btnCrearTarea = $lista.querySelector('#btnCrearTarea');

    async function crearTarea() {
        await onCrearNuevaTarea(tituloTarea.value, descripcionTarea.value, lista.idLista);
        tituloTarea.value = '';
        descripcionTarea.value = '';
        new bootstrap.Collapse(document.getElementById(`myCollapseTarea-${lista.idLista}`)).hide()
    }

    escuchador(btnCrearTarea, crearTarea)

    // _----------------------------------------------------------

    const titulo = $lista.querySelector('#listaNombreEditable');

    async function mapPearDataAlEditar(lista, nuevoValor) {
        await onEdit(lista.idLista, lista.idTablero, nuevoValor);
    }

    hacerEditable(titulo, mapPearDataAlEditar, lista);
    const btnEliminar = $lista.querySelector('#deleteButton')

    function deleteListaener() {
        onDelete(lista.idLista, lista.idTablero)
    }


    escuchador(btnEliminar, deleteListaener)

    return $lista.firstElementChild;
}

