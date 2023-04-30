const crearNavbarItem = (nombre, idTablero) => {
    const navbarItem = document.createElement('li')
    navbarItem.classList.add('nav-item', 'hover', 'sidebar-menu-item')
    navbarItem.id = idTablero
    navbarItem.innerHTML = `
            <p  class="nav-link text-light">${nombre}</p>
    `
    return navbarItem;
}


export function addTablerosToSidebar(tableros = [], onClickNavbarItem) {
    const sidebar = document.querySelector('#sidebar')
    
    const listItems = tableros?.map(tablero => {
        const navbarItem = crearNavbarItem(tablero.nombre, tablero.idTablero)
        navbarItem.addEventListener('click', () => onClickNavbarItem(tablero))
        return navbarItem;
    })

    sidebar.append(...listItems)
}

