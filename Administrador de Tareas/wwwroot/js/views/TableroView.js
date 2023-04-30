import {crearTablero} from "../components/Tablero.js";
import {addTablerosToSidebar} from "../components/Navbar.js";
import {LocalStorage} from "../util/localStorage.js";

export class TableroView {
    #localStorage = new LocalStorage();

    constructor(ClassInstance) {
        
    }

    mostrarHeader() {
        const header = document.querySelector('#header');
        header?.classList.remove('invisible');
    }

    ocultarHeader() {
        const header = document.querySelector('#header');
        header?.classList.add('invisible');
    }


    render(tablero) {
        crearTablero(tablero);
    }


}