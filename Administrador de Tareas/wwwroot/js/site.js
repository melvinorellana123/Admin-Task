import {TableroControler} from "./controllers/TableroControler.js";
import {SidebarControler} from "./controllers/SidebarController.js";
import {TableroService} from "./services/TableroService.js";
import {SidebarView} from "./views/SidebarView.js";
import {TableroView} from "./views/TableroView.js";

export class App {
    #baseUrl;
    #services;
    #controllers;
    #views;

    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
        this.#services = [TableroService]
        this.#controllers = [TableroControler, SidebarControler]
        this.#views = [SidebarView, TableroView]
        /**
         * Inicializamos los servicios y las vistas o en otras palabras
         * hacemos new de cada servicio y de cada vista
         * @example
         *  new TableroService(), new TableroView()
         */
        const todosLosServicios = this.#inicializarServices()
        const todasLasVistas = this.#inicializarViews()

        // inyectamos los servicios y las vistas en todos los controladores

        this.#inyectar({
            services: todosLosServicios,
            views: todasLasVistas
        })
    }

    #inicializarServices() {
        //creamos una instancia de cada servicio y le pasa la url base
        const services = this.#services.map(service => new service(this.#baseUrl))
        return services
    }

    #inicializarViews() {
        const views = this.#views.map(view => new view())
        return views
    }

    //inyectamos los servicios y vistas en todos los controladores
    #inyectar({views, services}) {
        this.#controllers.forEach(controller => {
            //jusntamos los servicios y las vistas en un solo array para luego Crear un objetos
            // con una propiedad donde estarán todos los servicios y otra propiedad donde estarán todas las vistas
            const servicesObject = [...views, ...services].reduce((acc, claseAinyectar) => {

                const claseNombre = claseAinyectar.constructor.name
                if (claseNombre.includes('Service')) {
                    //creamos una propiedad en el objeto con el nombre de la clase y le asignamos la instancia de la clase
                    acc.Servicios[claseNombre] = claseAinyectar
                }

                if (claseNombre.includes('View')) {
                    //creamos una propiedad en el objeto con el nombre de la clase y le asignamos la instancia de la clase
                    acc.Vistas[claseNombre] = claseAinyectar
                }
                return acc
            }, {
                Servicios: {},
                Vistas: {}
            })

            //creamos una instancia del controlador y le pasamos el objeto con los servicios
            new controller(servicesObject)
        })
    }
}
