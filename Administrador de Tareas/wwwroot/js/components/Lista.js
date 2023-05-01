import {crearTareaUI} from './TareaUI.js';

export function crearLista(lista, onDelete, onEdit) {
    const tareas = lista.tareas?.map(tarea => crearTareaUI(tarea)).join('') ?? 'No hay tareas';
    const listaHtmlText = `
        <div class="lista glasmorfisify" id="lista-${lista.idLista}">
            <div class="justify-content-between row p-3">
                <h3 class="col">${lista.listaNombre}</h3>
                <div class="col">
                    <div class="row flex-nowrap gap-2">
                        <button class="btn btn-primary col" type="button">Editar</button>
                        <button class="btn btn-danger col" type="button">Eliminar</button>
                    </div>
                </div>
            </div>
             ${tareas}
        </div>`

    const $lista = document.createElement('div');
    $lista.innerHTML = listaHtmlText;

    $lista.querySelector('.btn-danger').removeEventListener('click', () => {
        onDelete(lista.idLista, lista.idTablero)
    });

    $lista.querySelector('.btn-primary').removeEventListener('click', () => {
        onEdit(lista.idLista, lista.idTablero)
    });


    $lista.querySelector('.btn-danger').addEventListener('click', () => {
        onDelete(lista.idLista, lista.idTablero)
    });

    $lista.querySelector('.btn-primary').addEventListener('click', () => {
        onEdit(lista.idLista, lista.idTablero)
    });

    return $lista.firstElementChild;
}