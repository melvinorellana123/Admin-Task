export class LocalStorage {
    setItem(key, value) {
        localStorage.setItem(key, value)
    }

    getItem(key, value) {
        return localStorage.getItem(key, value)
    }
}

