export class SidebarControler {
    #sidebarView;
    #tableroView;

    constructor({Servicios: {TableroService}, Vistas: {SidebarView, TableroView}}) {

        this.tableroService = TableroService;

        this.#sidebarView = SidebarView;
        this.#sidebarView.setControladorInstancia(this);

        this.#tableroView = TableroView;


        this.cargarNav();
    }

    async onSelectTablero(id, nombre) {
        const tablero = await this.tableroService.getTablero(id, nombre);
        this.#tableroView.render(tablero);
    }

    async cargarNav() {
        const tableros = await this.tableroService.getTableros();
        this.#sidebarView.renderNav(tableros);
    }
}

 