import {Lista} from "../models/Lista.js";

export class ListaService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async crearLista(idTablero, nombre) {
        const listaCreada = await fetch(`${this.baseUrl}Listas/CrearLista`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ListaNombre: nombre,
                IdTablero: +idTablero
            })
        });

        const lista = await listaCreada.json();
        return new Lista(
            lista.idLista,
            lista.listaNombre,
            lista.idTablero,
            lista.listaOrden,
            lista.tareas
        );
    }

    async borrarLista(idLista) {
        try {

            await fetch(`${this.baseUrl}Listas/EliminarLista/${idLista}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            return Promise.resolve();
        } catch (error) {
            throw new Error(error);
        }
    }
}

