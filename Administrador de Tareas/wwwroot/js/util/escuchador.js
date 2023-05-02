export function escuchador($element, escuchador) {
    $element.removeEventListener('click', escuchador);


    $element.addEventListener('click', escuchador);

}