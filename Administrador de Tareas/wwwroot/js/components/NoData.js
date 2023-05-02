export const NoData = (text) => {
    const div = document.createElement('div');
    div.classList.add('no-data', 'row', 'justify-content-center', 'w-100');
    div.innerHTML = `
        <div class="col-6 col-sm-3  col-md-3 " style="width: fit-content">
            <div class="row flex-column align-items-center text-center">
            <img class="NoData-imagen col" src="Images/documento.png" alt="no hay datos">
            <h5 class="text-light col" >${text}</h5>
        </div>
        </div>
    `;
    return div;
}