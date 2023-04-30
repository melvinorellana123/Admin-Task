const crearNavbarItem = (nombre, idTablero) => {
    const navbarItem = document.createElement('li')
    navbarItem.classList.add('nav-item', 'hover', 'sidebar-menu-item')
    navbarItem.id = idTablero
    navbarItem.innerHTML = `
        <div class="row align-items-center mx-1  " >
            <p  class="nav-link text-light col-10 text-white" style="height: 18px">${nombre}</p>
            <span data-id="${idTablero}" class="col-1 btnEliminar" style="cursor: pointer;" >❌</span>
        </div>
    `
    return navbarItem;
}

export function addTablerosToSidebar(tableros = [], onClickNavbarItem) {
    const sidebar = document.querySelector('#sidebar')
    sidebar.innerHTML = ''

    const listItems = tableros?.map(tablero => {
        const navbarItem = crearNavbarItem(tablero.nombre, tablero.idTablero)
        navbarItem.addEventListener('click', () => onClickNavbarItem(tablero.nombre, tablero.idTablero))
        return navbarItem;
    })

    sidebar.append(...listItems)
}

