import {addTablerosToSidebar} from "../components/Navbar.js";

export class SidebarView {
    #sidebarControllerInstance;
    #button

    constructor() {
        // this.selectcionarBotionCrearTablero()
    }

    setControladorInstancia(SidebarControllerInstance) {
        this.#sidebarControllerInstance = SidebarControllerInstance;

        // si hay un tablero seleccionado en localStorage pedir los datos de ese tablero
        if (this.#sidebarControllerInstance.tableroSeleccionado) {
            this.onClickNavbarItem(this.#sidebarControllerInstance.tableroSeleccionado)
        }
    }

    async onClickNavbarItem({idTablero, nombre}) {
        await this.#sidebarControllerInstance.onSelectTablero(idTablero, nombre);
        this.#setNavItemActiva(idTablero);
    }

    #setNavItemActiva(navItemId) {
        const navItems = document.querySelector('#sidebar')
        navItems.childNodes.forEach(item => {
            item.classList.remove('active')
        })
        const navItem = document.getElementById(navItemId)
        navItem?.classList.add('active')
    }

    onCrearTablero() {
    
    }

    selectcionarBotionCrearTablero() {
        // this.#button = document.querySelector('#crear-tablero')
        // this.#button.addEventListener('click', () => {
        //     this.onCrearTablero()
        // })
    }


    renderNav(tableros) {
        addTablerosToSidebar(tableros, this.onClickNavbarItem.bind(this));
    }
}