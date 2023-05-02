import {crearTareaUI} from './TareaUI.js';

export function crearLista(lista, onDelete, onEdit) {
    const tareas = lista.tareas?.map(tarea => crearTareaUI(tarea)).join('') ?? 'No hay tareas';
    let listaNombre = lista.listaNombre;

    let editando = false;

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
                <span class="col" id="textoOInput" > 
                    ${listaTitulo.outerHTML}
                </span>
                <div class="col-2">
                    <div class="row flex-nowrap gap-2 justify-content-end">
<!--                     <span id="deleteButton" class="col-auto circulo-eliminar p-0" style="cursor: pointer;" ></span>-->
                     <span id="deleteButton" class="col-autop-0 icono-basurero" style="cursor: pointer;" >
                     <img src="Images/borrar.png" width="20px">
                    
</span>

                       
                    </div>
                </div>
            </div>
             ${tareas}
             
                         
               
<!--             
-->
                 <div class="col gap-2 ">

                    <div class="row justify-content-end p-2">
                        <button
                            class="btn btn-light col-12 boton-crear-seccion"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#myCollapse"
                            aria-expanded="false"
                            aria-controls="collapseExample">
                            Nueva Tarea
                        </button>
                    </div>

                    <div class="row collapse g-2 mt-2" id="myCollapse">
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
  <textarea class="form-control" placeholder="Descripción" id="floatingTextarea"></textarea>
  <label for="floatingTextarea">Descripción</label>
</div>
          
          
                    </div>
                </div>
           
                   
        </div>`

    const $lista = document.createElement('div');
    $lista.innerHTML = listaHtmlText;

    function mostrarINputOTexto() {
        editando = !editando;
        listaTituloEdit.value = listaNombre;
        listaTitulo.innerText = listaNombre;
        const elemento = editando ? listaTituloEdit : listaTitulo;
        return elemento;
    }

    $lista.querySelector('#textoOInput').addEventListener('dblclick', (e) => {
        e.target.innerHTML = '';
        e.target.append(mostrarINputOTexto());
    });

    listaTituloEdit.addEventListener('keyup', (e) => {
        const nuevoValor = e.target.value;
        if (e.key === 'Enter') {
            listaNombre = nuevoValor;
            e.target.parentNode.innerHTML = mostrarINputOTexto().outerHTML;
            onEdit(lista.idLista, lista.idTablero, nuevoValor)
        }
    });

    $lista.querySelector('#deleteButton').removeEventListener('click', () => {
        onDelete(lista.idLista, lista.idTablero)
    });


    $lista.querySelector('#deleteButton').addEventListener('click', () => {
        onDelete(lista.idLista, lista.idTablero)
    });

    // escuchar cuando den click fuera de inputEditLista
    document.addEventListener('click', (e) => {
        if (e.target.id !== 'inputEditLista' && editando) {
            const container = document.querySelector('#textoOInput');
            container.innerHTML = '';
            container.innerHTML = mostrarINputOTexto().outerHTML;
        }
    });

    return $lista.firstElementChild;
}