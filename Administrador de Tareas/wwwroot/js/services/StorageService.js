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
}