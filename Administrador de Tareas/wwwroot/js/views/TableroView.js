import {hacerEditable} from "../util/hacerEditable.js";

export class TableroView {

    constructor() {
    }

    setControladorInstancia(TableroControllerInstance) {
        this.tableroIntance = TableroControllerInstance;
        this.editarNombreTablero();
    }

    mostrarHeader() {
        const header = document.querySelector('#header');
        const tableroNombre = this.tableroIntance.storageService.tableroSeleccionado?.nombreTablero

        const titulo = header?.querySelector('h1');
        titulo.innerHTML = tableroNombre;
        header?.classList.remove('invisible');

    }

    ocultarHeader() {
        const header = document.querySelector('#header');
        header?.classList.add('invisible');
    }

    async onEditarTablero(idTablero, nuevoNombre) {
        await this.tableroIntance.onEditarTablero(idTablero, nuevoNombre);
    }

    editarNombreTablero() {

        const titulo = header?.querySelector('#tituloTablero');
        const {idTablero} = this.tableroIntance.storageService.tableroSeleccionado
        hacerEditable(titulo, (_, nuevoValor) => this.onEditarTablero(idTablero, nuevoValor), titulo.textContent);
    }


}