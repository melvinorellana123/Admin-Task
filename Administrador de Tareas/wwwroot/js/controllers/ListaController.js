export class ListaControler {
    storageService;

    constructor({Servicios: {ListaService, StorageService}, Vistas: {ListaView, TableroView, SidebarView}}) {
        this.storageService = StorageService;
        this.sidebarView = SidebarView;
        this.tableroView = TableroView;
        this.listaService = ListaService;
        this.listaView = ListaView;
        this.listaView.setListaControllerRef(this);
    }


    async onCrearLista(nombre) {
        const idTableroSeleccionado = this.storageService.tableroSeleccionado.idTablero;
        const res = await this.listaService.crearLista(idTableroSeleccionado, nombre);
        await this.sidebarView.mostrarTableroSeleccionado();
        return res;
    }

    async onBorrarLista(idLista) {
        const res = await this.listaService.borrarLista(idLista);
        return res;
    }

    async onEditarLista(idLista, idTablero, nuevoNombre) {
        const res = await this.listaService.editarLista(idLista, idTablero, nuevoNombre);

        return res;
    }

    async onCrearTarea(nombre, descripcion, idLista) {
        const res = await this.listaService.crearTarea(nombre, descripcion, idLista)
        await this.sidebarView.mostrarTableroSeleccionado();
        return res;

    }

    async onEditarTarea(tarea) {
        return await this.listaService.editarTarea(tarea)
    }

    async onEliminarTarea(tarea) {
        await this.listaService.eliminarTarea(tarea)
    }

    async onMoverTarea(moverTareaDto) {
        await this.listaService.moverTarea(moverTareaDto)
    }
}

 