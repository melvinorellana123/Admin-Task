export function escuchador($element, escuchador, event = 'click') {
    $element.removeEventListener(event, escuchador);


    $element.addEventListener(event, escuchador);

}