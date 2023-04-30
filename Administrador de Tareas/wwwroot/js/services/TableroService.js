import {LocalStorage} from "../util/localStorage.js";

export class TableroService {
    #localStorage = new LocalStorage();
    tableroSeleccionado = {
        idTablero: null,
        nombreTablero: null
    };

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.tableroSeleccionado = this.obtenerTableroSeleccionado;
    }

    get obtenerTableroSeleccionado() {
        this.tableroSeleccionado.nombreTablero = this.#localStorage.getItem("nombreTablero");
        this.tableroSeleccionado.idTablero = this.#localStorage.getItem("idTablero");
    }

    #setTableroSeleccionado(id, nombre) {
        this.tableroSeleccionado = {
            idTablero: id,
            nombreTablero: nombre
        };

        this.#localStorage.setItem("nombreTablero", nombre);
        this.#localStorage.setItem("idTablero", id);
    }

    async getTablero(id, nombre) {
        const response = await fetch(`${this.baseUrl}Tableros/ObtenerTableroPorId/${id.toString()}/?nombreTablero=${nombre}`);
        const tablero = await response.json();
        this.#setTableroSeleccionado(id, nombre);
        return {
            idTablero: tablero.idTablero,
            nombreTablero: tablero.nombreTablero,
            listas: tablero.listas
        };
    }

    async getTableros() {
        const response = await fetch(`${this.baseUrl}Tableros/GetTableros`);
        return await response.json();
    }
}

