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
        <div class="lista glasmorfisify col-4" id="lista-${lista.idLista}">
            <div class="justify-content-between row p-3 align-items-center">
                <span class="col" id="textoOInput" > 
                    ${listaTitulo.outerHTML}
                </span>
                <div class="col-2">
                    <div class="row flex-nowrap gap-2 justify-content-end">
                         <span id="deleteButton" class="col-3" style="font-size: 20px" type="button">🗑</span>
                    </div>
                </div>
            </div>
             ${tareas}
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