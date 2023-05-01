import {addTablerosToSidebar} from "../components/Navbar.js";
import {LocalStorage} from "../util/localStorage.js";

export class SidebarView {
    #sidebarControllerInstance;
    #localStorage = new LocalStorage()
    #navOpen = false

    constructor() {
        // this.selectcionarBotionCrearTablero()

        this.#navOpen = this.#getNavOpenState();
        this.setDefaulNavOpenState()
        this.setDefaultNavEstado()
        this.onCrearTableroListener()
    }

    setControladorInstancia(SidebarControllerInstance) {
        this.#sidebarControllerInstance = SidebarControllerInstance;
    }

    mostrarTableroSeleccionado() {
        // si hay un tablero seleccionado en localStorage pedir los datos de ese tablero
        const {idTablero, nombreTablero} = this.#sidebarControllerInstance.storageService.tableroSeleccionado
        this.onClickNavbarItem(idTablero, nombreTablero)
    }

    async onClickNavbarItem(idTablero, nombreTablero) {
        await this.#sidebarControllerInstance.onSelectTablero(idTablero, nombreTablero);
        this.setNavItemActiva(idTablero);
    }

    setNavItemActiva(navItemId) {
        const navItems = document.querySelector('#sidebar')
        navItems.childNodes.forEach(item => {
            item.classList.remove('active')
        })
        const navItem = document.getElementById(navItemId)
        navItem?.classList.add('active')
    }


    setDefaulNavOpenState() {
        const $myOffcanvas = document.getElementById('offcanvasNavbar')

        $myOffcanvas.addEventListener('show.bs.offcanvas', () => {
            this.#setNavOpenState(true)
        })
        $myOffcanvas.addEventListener('hidden.bs.offcanvas', () => {
            this.#setNavOpenState(false)
        })
    }

    setDefaultNavEstado() {
        const newNavOpenState = this.#navOpen
        const $myOffcanvas = document.getElementById('offcanvasNavbar')
        const $nav = new bootstrap.Offcanvas($myOffcanvas)

        if (newNavOpenState) {
            $nav.show()
        } else {
            $nav.hide()
        }
    }

    #setNavOpenState(state) {
        this.#localStorage.setItem('navOpen', state)
        this.#navOpen = state
    }

    #getNavOpenState() {
        const navOpen = JSON.parse(this.#localStorage.getItem('navOpen'))

        return navOpen ?? this.#navOpen
    }


    cerrarCrearTableroCollapse() {
        const myCollapse = document.getElementById('myCollapse')
        new bootstrap.Collapse(myCollapse).hide()
    }


    onCrearTableroListener() {
        const $btnCrear = document.querySelector('#btnCrearTablero')
        const lsitenerr = async () => {
            const nombreTablero = document.querySelector('#tituloTablero').value
            await this.#sidebarControllerInstance.onCrearTablero(nombreTablero)
            document.querySelector('#tituloTablero').value = ''

            this.cerrarCrearTableroCollapse()
        }

        $btnCrear.removeEventListener('click', lsitenerr)
        $btnCrear.addEventListener('click', lsitenerr)
    }

    onBorrarTableroListener() {
        const $btnsBorrarTablero = document.querySelectorAll('.btnEliminar')
        $btnsBorrarTablero.forEach(elem => {
            elem.addEventListener('click', async (e) => {
                e.preventDefault()
                e.stopPropagation()
                const id = e.target.dataset.id
                await this.#sidebarControllerInstance.onBorrarTablero(id)
            })
        })
    }

    renderNav(tableros) {
        addTablerosToSidebar(tableros, (nombre, id) => this.onClickNavbarItem(id, nombre))
        this.onBorrarTableroListener()
    }
}