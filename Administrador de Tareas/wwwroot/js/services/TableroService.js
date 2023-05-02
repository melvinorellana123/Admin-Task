export class TableroService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async getTablero(id, nombre) {
        const response = await fetch(`${this.baseUrl}Tableros/ObtenerTableroPorId/${id.toString()}/?nombreTablero=${nombre}`);
        const tablero = await response.json();
        return {
            idTablero: tablero.idTablero,
            nombreTablero: tablero.nombreTablero,
            listas: tablero.listas
        };
    }

    async getTableros() {
        const response = await fetch(`${this.baseUrl}Tableros/GetTableros`);
        return await response.json();
    }

    async crearTablero(nombre) {
        const res = await fetch(`${this.baseUrl}Tableros/CrearTablero/?nombreTablero=${nombre}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        return await res.json();

    }

    async borraTablero(id) {
        await fetch(`${this.baseUrl}Tableros/EliminarTablero/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        return Promise.resolve();
    }

    async editarTablero(id, nombre) {
        await fetch(`${this.baseUrl}Tableros/EditarTablero`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({IdTablero: id, Nombre: nombre})
        });

        return Promise.resolve();
    }
}

