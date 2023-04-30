export class TableroControler {

    constructor({Servicios: {TableroService}, Vistas: {TableroView}}) {
        this.tableroService = TableroService;
        this.tableroView = TableroView;
        this.tableroView.setControladorInstancia(this);
        
    }

    async onSelectTablero(id, nombre) {
        try {
            const tablero = await this.tableroService.getTablero(id, nombre);
            this.tableroView.setTableroSeleccionado(nombre);
            this.tableroView.render(tablero);
        } catch (e) {
            this.tableroView.ocultarHeader();
            console.log(e)
        }
    }


}

 