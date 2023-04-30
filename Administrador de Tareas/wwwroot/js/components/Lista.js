﻿import {crearTareaUI} from './TareaUI.js';

export function crearLista(lista) {
    const tareas = lista.tareas.map(tarea => crearTareaUI(tarea)).join('')

    return `
        <div class="lista glasmorfisify">
            <div class="justify-content-between row p-3">
                <h3 class="col">Terminado</h3>
                <div class="col">
                    <div class="row flex-nowrap gap-2">
                        <a href="" class="btn btn-primary col">Editar</a>
                        <a href="" class="btn btn-danger col">Eliminar</a>
                    </div>
                </div>
            </div>
        
             ${tareas}
        </div>`
}