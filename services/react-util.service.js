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

    if (name.includes('-')) {
        const keys = name.split('-')
        const newProp = keys.reduceRight((acc, key, idx) => {
            if (idx === keys.length - 1) {
                acc[key] = value
            } else {
                acc = { [key]: { ...acc } }
            }
            return acc
        }, {})
        stateSetter(prevStateVar => ({ ...prevStateVar, ...newProp }))
    } else {
        stateSetter(prevStateVar => ({ ...prevStateVar, [name]: value }))
    }
}