import {crearTablero} from "../components/Tablero.js";

export class TableroView {

    constructor() {
    }

    setControladorInstancia(TableroControllerInstance) {
        this.tableroIntance = TableroControllerInstance;
    }

    mostrarHeader() {
        const header = document.querySelector('#header');
        const tableroNombre = this.tableroIntance.tableroService.tableroSeleccionado?.nombreTablero
        const titulo = header?.querySelector('h1');
        titulo.innerHTML = tableroNombre;
        header?.classList.remove('invisible');

    }

    ocultarHeader() {
        const header = document.querySelector('#header');
        header?.classList.add('invisible');
    }


    render(tablero) {
        console.log(tablero)
        crearTablero(tablero);
    }


}