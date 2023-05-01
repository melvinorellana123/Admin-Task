export class SidebarControler {
    tableroService
    #sidebarView;
    #tableroView;
    #listaView;

    constructor({Servicios: {TableroService, StorageService,}, Vistas: {SidebarView, TableroView, ListaView}}) {
        this.#listaView = ListaView;
        this.tableroService = TableroService;
        this.storageService = StorageService;

        this.#sidebarView = SidebarView;
        this.#sidebarView.setControladorInstancia(this);

        this.cargarNav().then(() => {
            //mostrar tablero seleccionado hasta que se traigan todos los tableros
            if (this.storageService?.tableroSeleccionado?.idTablero) {
                this.#sidebarView.mostrarTableroSeleccionado();
            } else {
                this.#listaView.render([]);
            }
        });

        this.#tableroView = TableroView;
    }


    async onSelectTablero(id, nombre) {
        const tablero = await this.tableroService.getTablero(id, nombre);

        this.storageService.setTableroSeleccionado({idTablero: tablero.idTablero, nombre: tablero.nombreTablero});

        this.#listaView.render(tablero?.listas);
        this.#tableroView.mostrarHeader();
        await this.cargarNav();

    }


    async onCrearTablero(tableroNombre) {
        if (!tableroNombre.trim()) return;
        const tablero = await this.tableroService.crearTablero(tableroNombre);
        await this.onSelectTablero(tablero.idTablero, tablero.nombre);
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
        this.#listaView.render();
    }

    async cargarNav() {
        const tableroSeleccionadoId = this.storageService?.tableroSeleccionado?.idTablero

        const tableros = await this.tableroService.getTableros();
        this.#sidebarView.renderNav(tableros);
        if (tableroSeleccionadoId) {
            this.#sidebarView.setNavItemActiva(+tableroSeleccionadoId);
        }
    }
}

 