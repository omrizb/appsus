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
        stateSetter(prevStateVar => ({ ...deepMerge(prevStateVar, newProp) }))
    } else {
        stateSetter(prevStateVar => ({ ...prevStateVar, [name]: value }))
    }
}

function deepMerge(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object'

    if (!isObject(target) || !isObject(source)) {
        return source
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key]
        const sourceValue = source[key]

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue)
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = deepMerge(Object.assign({}, targetValue), sourceValue)
        } else {
            target[key] = sourceValue
        }
    })

    return target
}