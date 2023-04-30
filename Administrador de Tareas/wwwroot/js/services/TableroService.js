import {LocalStorage} from "../util/localStorage.js";

export class TableroService {
    #localStorage = new LocalStorage();
    tableroSeleccionado = {
        idTablero: null,
        nombreTablero: null
    };

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.obtenerTableroSeleccionado
    }

    get obtenerTableroSeleccionado() {
        this.tableroSeleccionado = {
            idTablero: this.#localStorage.getItem("idTablero"),
            nombreTablero: this.#localStorage.getItem("nombreTablero")
        }
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

    async crearTablero(nombre) {
        const tablero = await fetch(`${this.baseUrl}Tableros/CrearTablero/?nombreTablero=${nombre}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        return await tablero.json();
    }

    async borraTablero(id) {
        await fetch(`${this.baseUrl}Tableros/EliminarTablero/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        return Promise.resolve();
    }
}

