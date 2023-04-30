
export class CreateSingleton {
    constructor(Clase) {
        if (!CreateSingleton.instance) {
            this.tableroService = Clase;
            CreateSingleton.instance = this;
        }
        return CreateSingleton.instance;
    }
}