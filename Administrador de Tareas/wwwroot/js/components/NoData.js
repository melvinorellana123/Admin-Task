export const NoData = (text) => {
    const div = document.createElement('div');
    div.classList.add('no-data', 'row', 'justify-content-center', 'w-100');
    div.innerHTML = `
        <div class="col-6 col-sm-3  col-md-3 justify-content-center" style="width: fit-content">
            <img src="img/empty.svg" alt="no hay datos">
            <h2>${text}</h2>
        </div>
    `;
    return div;
}