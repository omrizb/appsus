export const reactUtilService = {
    handleChange,
}

function handleChange({ target }, stateSetter) {
    const { type, name } = target
    let { value } = target

    if (!name) throw new Error('Element must have a "name" property.')

    switch (type) {
        case 'range':
        case 'number':
            value = +value
            break;
        case 'checkbox':
            value = target.checked
            break;
    }

    stateSetter(prevStateVar => ({ ...prevStateVar, [name]: value }))
}