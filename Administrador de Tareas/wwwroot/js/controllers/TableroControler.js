import {LocalStorage} from "../util/localStorage.js";
import {TableroView} from "../views/TableroView.js";

export class TableroControler {
    #localStorage = new LocalStorage();

    constructor({TableroService}) {

        this.tableroService = TableroService;
        this.tableroView = new TableroView();
    }

    async onSelectTablero(id, nombre) {
        try {
            const tablero = await this.tableroService.getTablero(id, nombre);
            this.tableroView.setTableroSeleccionado(nombre);
            this.tableroView.render(tablero);
        } catch {
            this.tableroView.ocultarHeader();
        }
    }
}

 