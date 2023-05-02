import {crearLista} from "../components/Lista.js";
import {NoData} from "../components/NoData.js";
import {crearTareaUI} from "../components/TareaUI.js";


function MultipleContainers(listas, tablero, onMoverCard, onOrdenar) {
    const containersIds = listas.map(l => `#tareas-${l.idLista}`).join(' ,')

    const containers = tablero.querySelectorAll(`${containersIds}`);

    containers.forEach(con => {

        Sortable.create(con, {
            group: 'shared',
            animation: 150,
            handle: '.tarea',
            easing: 'cubic-bezier(0.895,0.03,0.685,0.22)',
            chosenClass: 'hover',

            // Event when you move an item in the list or between lists
            onMove: function (/**Event*/evt, /**Event*/originalEvent) {
                // Example: https://jsbin.com/nawahef/edit?js,output
                evt.dragged; // dragged HTMLElement
                evt.draggedRect; // DOMRect {left, top, right, bottom}
                evt.related; // HTMLElement on which have guided
                evt.relatedRect; // DOMRect
                evt.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
                originalEvent.clientY; // mouse position
                // return false; — for cancel
                // return -1; — insert before target
                // return 1; — insert after target
                // return true; — keep default insertion point based on the direction
                // return void; — keep default insertion point based on the direction

            },
            onSort: function (/**Event*/evt) {
                onOrdenar(evt)
            },

            // Element is dropped into the list from another list
            onAdd: function (/**Event*/evt) {
                // same properties as onEnd
                // onMoverCard(evt)
            },
        });
    })

}

export class ListaView {
    #listaController
    #numListas = 0;
    $tablero = document.querySelector('#listado');

    constructor() {
        this.onCrearListaListener();
    }

    setListaControllerRef(listaController) {
        this.#listaController = listaController;
    }


    onCrearListaListener() {
        const $btnCrearLista = document.querySelector('#btnCrearLista');

        $btnCrearLista.addEventListener('click', async () => {
            const $tituloLista = document.querySelector('#tituloLista');
            const listaCreada = await this.#listaController.onCrearLista($tituloLista.value);
            $tituloLista.value = '';
            this.ocultarInputCrearLista();
            // this.agregarLista(listaCreada);
        });
    }

    ocultarInputCrearLista() {
        const myCollapse = document.getElementById('myCollapseLista')
        new bootstrap.Collapse(myCollapse).hide()
    }

    async onEliminarLista(idLista) {
        try {
            await this.#listaController.onBorrarLista(idLista);
            this.removerListaDom(idLista)
        } catch (e) {
            console.log(e)
        }
    }

    removerListaDom(idLista) {
        const $lista = document.querySelector(`#lista-${idLista}`);
        $lista.remove();
        this.#numListas--;
        if (!this.#numListas) {
            this.mostrarNoHayListas()
        }
    }

    onEditarLista(idLista, IdTablero, nuevoNombre) {
        this.#listaController.onEditarLista(idLista, IdTablero, nuevoNombre)
    }

    async onCrearTarea(nombre, descripcion, idLista) {

        const tarea = await this.#listaController.onCrearTarea(nombre, descripcion, idLista);

        this.agregarTarea(tarea);
    }

    async onEditarTarea(tarea) {
        return await this.#listaController.onEditarTarea(tarea)
    }

    removerTareaDom(tarea) {
        this.$tablero = document.querySelector('#listado');
        const $lista = this.$tablero.querySelector(`#tareas-${tarea.idLista}`)
        const $tarea = $lista.querySelector(`#tarea-${tarea.idTarea}`)
        $lista.removeChild($tarea)
    }

    async onBorrarTarea(tarea) {
        const res = await this.#listaController.onEliminarTarea(tarea)
        this.removerTareaDom(tarea);
        return res;
    }

    async onMoverTarea(idTarea, idListaOrigen, idListaDestino) {
    }

    async ordenarTarea() {

    }


    async onCrearTarea(nombre, descripcion, idLista) {
        const tarea = await this.#listaController.onCrearTarea(nombre, descripcion, idLista);
        // this.agregarTarea(tarea);
        return tarea;
    }

    crearTareaUiConEventos(tarea) {
        return crearTareaUI(tarea,
            async (tarea) => await this.onEditarTarea(tarea),
            async (tarea) => await this.onBorrarTarea(tarea))
    }


    agregarTarea(tarea) {
        const $tareasContenedor = document.querySelector(`#tareas-${tarea.idLista}`);
        $tareasContenedor.append(this.crearTareaUiConEventos(tarea));

    }

    crearListaConEventos(lista) {
        return crearLista(
            lista,
            (idLista) => this.onEliminarLista(idLista),
            (...data) => this.onEditarLista(...data),
            async (...tarea) => await this.onCrearTarea(...tarea),
            (...tarea) => this.crearTareaUiConEventos(...tarea),
        )
    }

    agregarLista(lista) {
        this.#numListas++;
        this.removerNoHayListas();
        this.$tablero.append(this.crearListaConEventos(lista));
    }

    #limpiarListas() {
        this.$tablero.innerHTML = '';
    }

    onMoverCard(data) {
        // console.log(data)
    }


    async onOrdenar(data) {
        let paraUltimaPosicion = false
        const listaFromId = data.from.id.split('-').at(-1)
        const listaToId = data.to.id.split('-').at(-1)
        let antiguaPosicion = data.oldIndex
        let nuevaPosicion = data.newIndex

        const fromLista = this.listas.find(l => l.idLista === +listaFromId)
        const toLista = this.listas.find(l => l.idLista === +listaToId)

        const tareaFrom = fromLista.tareas.find((t, i) => i === +antiguaPosicion)

        if (+nuevaPosicion === toLista.tareas.length) {
            paraUltimaPosicion = true
            nuevaPosicion = Number(nuevaPosicion) ? Number(nuevaPosicion) - 1 : Number(nuevaPosicion)
        }
        const tareaTo = toLista.tareas.find((t, i) => i === +nuevaPosicion) ?? {
            tareaOrden: tareaFrom.tareaOrden,
            idLista: +listaToId
        }
        console.log(tareaFrom, tareaTo, nuevaPosicion)
        const dtoOrdenar = {
            ParaUltimaPosicion: paraUltimaPosicion,
            TareaFrom: tareaFrom,
            TareaTo: tareaTo
        }
        await this.#listaController.onMoverTarea(dtoOrdenar)
    }


    render(listas) {
        const {fueBorrado} = this.#listaController.storageService;
        this.#limpiarListas();
        if (fueBorrado) {
            this.$tablero.append(NoData("Seleccione un tablero"));
            return
        }

        this.#numListas = listas.length;
        if (!this.#numListas) {
            this.mostrarNoHayListas()
            return
        }
        const listasUi = listas?.map(lista => this.crearListaConEventos(lista));
        this.listas = listas
        this.$tablero.append(...listasUi)
        MultipleContainers(listas, this.$tablero,
            (...tarea) => this.onMoverCard(...tarea),
            (...tarea) => this.onOrdenar(...tarea))
    }

    mostrarNoHayListas() {
        this.$tablero.append(NoData("Cree una lista"));
    }

    removerNoHayListas() {
        document.querySelector('.no-data')?.remove();
    }
}
