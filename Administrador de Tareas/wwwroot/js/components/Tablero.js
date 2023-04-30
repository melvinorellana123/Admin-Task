import {crearLista} from './Lista.js';

export function crearTablero(tablero) {
    const $tablero = document.querySelector('#listado');
    const listasUi = tablero.listas.map(lista => crearLista(lista)).join('');

    $tablero.innerHTML = listasUi;
}



