export class SidebarControler {
    tableroService
    #sidebarView;
    #tableroView;


    constructor({Servicios: {TableroService, StorageService}, Vistas: {SidebarView, TableroView}}) {

        this.tableroService = TableroService;
        this.storageService = StorageService;

        this.#sidebarView = SidebarView;
        this.#sidebarView.setControladorInstancia(this);

        this.cargarNav().then(() => {
            //mostrar tablero seleccionado hasta que se traigan todos los tableros
            if (this.storageService?.tableroSeleccionado?.idTablero) {
                this.#sidebarView.mostrarTableroSeleccionado();
            }else{
                this.#tableroView.render([]);
            }
        });

        this.#tableroView = TableroView;
    }


    async onSelectTablero(id, nombre) {
        const tablero = await this.tableroService.getTablero(id, nombre);
        this.#tableroView.render(tablero);
        this.#tableroView.mostrarHeader();
    }


    async onCrearTablero(tableroNombre) {
        if (!tableroNombre.trim()) return;
        const tablero = await this.tableroService.crearTablero(tableroNombre);

        await this.onSelectTablero(tablero.idTablero, tablero.nombre);
        await this.cargarNav();
    }

    async onBorrarTablero(id) {

        const borrandoElTableroSeleccionado = id === this.storageService?.tableroSeleccionado?.idTablero;
        console.log(id, this.storageService?.tableroSeleccionado?.idTablero)
        if (borrandoElTableroSeleccionado) {
            this.storageService.borrarTableroSeleccionado();
        }
        await this.tableroService.borraTablero(id);
        this.cargarNav();
        this.#tableroView.ocultarHeader();
        this.#tableroView.render([]);
    }

    async cargarNav() {
        const tableros = await this.tableroService.getTableros();
        this.#sidebarView.renderNav(tableros);
    }
}

 