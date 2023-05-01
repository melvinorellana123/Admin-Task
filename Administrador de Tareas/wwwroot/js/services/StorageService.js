export class StorageService {

    get tableroSeleccionado() {
        return {
            idTablero: localStorage.getItem("idTablero"),
            nombreTablero: localStorage.getItem("nombreTablero")
        }
    }

    borrarTableroSeleccionado() {
        localStorage.removeItem("idTablero");
        localStorage.removeItem("nombreTablero");
    }

    setTableroSeleccionado({idTablero, nombre}) {
        localStorage.setItem("idTablero", idTablero);
        localStorage.setItem("nombreTablero", nombre);
    }
    
    get fueBorrado() {
        return localStorage.getItem("idTablero") === null;
    }
}