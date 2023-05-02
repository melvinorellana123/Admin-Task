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

    async editarLista(idLista, idTablero, nuevoNombre) {
        console.log(idLista, idTablero, nuevoNombre)
        await fetch(`${this.baseUrl}Listas/EditarLista`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                IdLista: idLista,
                IdTablero: idTablero,
                ListaNombre: nuevoNombre
            }),
        });
    }

    async crearTarea(nombre, descripcion, idLista) {
        const tareaCreada = await fetch(`${this.baseUrl}Tareas/CrearTarea`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                TareaNombre: nombre,
                Descripcion: descripcion,
                IdLista: idLista
            })
        });

        return await tareaCreada.json();
    }

    async editarTarea(tarea) {
        return await fetch(`${this.baseUrl}Tareas/EditarTarea`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                IdTarea: tarea.idTarea,
                TareaNombre: tarea.tareaNombre,
                Descripcion: tarea.descripcion,
                IdLista: tarea.idLista,
                TareaOrden: tarea.tareaOrden
            })
        })
    }

    async eliminarTarea(tarea) {
        return await fetch(`${this.baseUrl}Tareas/EliminarTarea?idTarea=${tarea.idTarea}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
    }

    async moverTarea({ParaUltimaPosicion, TareaFrom, TareaTo}) {
        console.log(ParaUltimaPosicion, TareaFrom, TareaTo)
        return await fetch(`${this.baseUrl}Tareas/MoverTarea`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ParaUltimaPosicion: ParaUltimaPosicion,
                TareaFrom: {
                    IdTarea: TareaFrom.idTarea,
                    TareaNombre: TareaFrom.tareaNombre,
                    Descripcion: TareaFrom.descripcion,
                    IdLista: TareaFrom.idLista,
                    TareaOrden: TareaFrom.tareaOrden
                },
                TareaTo: {
                    IdTarea: TareaTo.idTarea,
                    TareaNombre: TareaTo.tareaNombre,
                    Descripcion: TareaTo.descripcion,
                    IdLista: TareaTo.idLista,
                    TareaOrden: TareaTo.tareaOrden
                }
            })
        })
    }
}

