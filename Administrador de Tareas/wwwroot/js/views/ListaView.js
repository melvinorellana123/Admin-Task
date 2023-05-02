import {crearLista} from "../components/Lista.js";
import {NoData} from "../components/NoData.js";
import {crearTareaUI} from "../components/TareaUI.js";

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
            (...tarea) =>this.onCrearTarea(...tarea),
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
    }

    mostrarNoHayListas() {
        this.$tablero.append(NoData("Cree una lista"));
    }

    removerNoHayListas() {
        document.querySelector('.no-data')?.remove();
    }
}
