export class TableroControler {

    constructor({Servicios: {TableroService, StorageService}, Vistas: {TableroView, ListaView}}) {
        this.tableroService = TableroService;
        this.storageService = StorageService;

        this.tableroView = TableroView;
        this.tableroView.setControladorInstancia(this);
        this.listaView = ListaView;

    }

    async onSelectTablero(id, nombre) {
        try {
            const tablero = await this.tableroService.getTablero(id, nombre);
            this.listaView.render(tablero);
        } catch (e) {
            this.tableroView.ocultarHeader();
            console.log(e)
        }
    }

    async onEditarTablero(idTablero, nuevoNombre) {
     
        await this.tableroService.editarTablero(idTablero, nuevoNombre);
    }
}

 