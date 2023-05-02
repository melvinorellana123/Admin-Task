export class ListaControler {
    storageService;

    constructor({Servicios: {ListaService, StorageService}, Vistas: {ListaView, TableroView}}) {
        this.storageService = StorageService;
        this.tableroView = TableroView;
        this.listaService = ListaService;
        this.listaView = ListaView;
        this.listaView.setListaControllerRef(this);
    }


    async onCrearLista(nombre) {
        const idTableroSeleccionado = this.storageService.tableroSeleccionado.idTablero;
        return await this.listaService.crearLista(idTableroSeleccionado, nombre);
    }

    async onBorrarLista(idLista) {
        const res = await this.listaService.borrarLista(idLista);
        return res;
    }
    
    async onEditarLista(idLista, idTablero, nuevoNombre) {
        const res = await this.listaService.editarLista(idLista, idTablero, nuevoNombre);
        return res;
    }
}

 