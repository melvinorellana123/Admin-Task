export function hacerEditable(element, onEditFn, data, editingStatusFn) {
    let currentValue = data.listaNombre;

    onEditarStart(element, editingStatusFn)
    escucharKeyUp(element, currentValue, onEditFn, data);
    onEditFinish(element, editingStatusFn)
}


export function onEditFinish(element, editingStatusFn) {
    element.addEventListener('blur', (e) => {
        element.setAttribute('contenteditable', 'false');
        editingStatusFn?.(false)
    });
}

export function onEditarStart(element, editingStatusFn) {
    element.addEventListener('dblclick', (e) => {
        e.target.setAttribute('contenteditable', 'true');
        element.focus();
        editingStatusFn?.(true)
    });
}

function escucharKeyUp(element, innicialValue, onEnterPress, data) {
    let currentValue = innicialValue;
    element.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.target.textContent === currentValue) {
                element.blur();
                return;
            }

            if (e.target.textContent === '') {
                e.target.textContent = currentValue;
            }

            try {
                currentValue = e.target.textContent;
                await onEnterPress(data, currentValue)

            } finally {
                element.blur();
            }
        }
    });
}
