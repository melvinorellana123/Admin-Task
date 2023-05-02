import {crearLista} from "../components/Lista.js";
import {NoData} from "../components/NoData.js";
import {crearTareaUI} from "../components/TareaUI.js";


function MultipleContainers(listas, tablero, onMoverCard) {
    const containersIds = listas.map(l => `#tareas-${l.idLista}`).join(' ,')

    const containers = tablero.querySelectorAll(`${containersIds}`);
 
    containers.forEach(con => {

        Sortable.create(con, {
            group: 'shared',
            animation: 150,
            handle: '.tarea',
            easing: 'cubic-bezier(0.895,0.03,0.685,0.22)',
            chosenClass: 'hover',
            onSort: function (evt) {

                // onMoverCard(evt)
            },
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
                // onMoverCard(evt,originalEvent)
            },

            // Element is dropped into the list from another list
            onAdd: function (/**Event*/evt) {
                // same properties as onEnd
                onMoverCard(evt)
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
            this.agregarLista(listaCreada);
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

    async onEditarTarea(idTarea, idLista, nuevoNombre, nuevaDescripcion) {

    }

    async onBorrarTarea(idTarea, idLista) {

    }

    async onMoverTarea(idTarea, idListaOrigen, idListaDestino) {
    }


    async onCrearTarea(nombre, descripcion, idLista) {
        const tarea = await this.#listaController.onCrearTarea(nombre, descripcion, idLista);
        this.agregarTarea(tarea);
    }

    crearTareaUiConEventos(tarea) {
        return crearTareaUI(tarea, this.onEditarTarea, this.onBorrarTarea, this.onMoverTarea)
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
            (...tarea) => this.onCrearTarea(...tarea),
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
        console.log(data)
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

        this.$tablero.append(...listasUi)
        MultipleContainers(listas, this.$tablero, this.onMoverCard)
    }

    mostrarNoHayListas() {
        this.$tablero.append(NoData("Cree una lista"));
    }

    removerNoHayListas() {
        document.querySelector('.no-data')?.remove();
    }
}
