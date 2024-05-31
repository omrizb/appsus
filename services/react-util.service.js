export const reactUtilService = {
    handleChange,
    deepMerge
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
            sourceValue.forEach(item => {
                if (isObject(item)) {
                    const targetIndex = targetValue.findIndex(t => t.id === item.id)
                    if (targetIndex > -1) {
                        targetValue[targetIndex] = deepMerge(targetValue[targetIndex], item)
                    } else {
                        targetValue.push(item)
                    }
                } else {
                    if (!targetValue.includes(item)) {
                        targetValue.push(item)
                    }
                }
            })
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = deepMerge(Object.assign({}, targetValue), sourceValue)
        } else {
            target[key] = sourceValue
        }
    })

    return target
}