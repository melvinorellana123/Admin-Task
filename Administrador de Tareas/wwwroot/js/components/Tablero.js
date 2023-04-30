import {crearLista} from './Lista.js';
import {NoData} from "./NoData.js";

export function crearTablero(tablero = []) {
    const $tablero = document.querySelector('#listado');
    const listasUi = tablero?.listas?.map(lista => crearLista(lista)).join('') ?? null;
    $tablero.innerHTML = listasUi ?? NoData().outerHTML;
}



