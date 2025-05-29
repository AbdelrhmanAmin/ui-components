const comparison = (a: any, b: any): boolean => {
    if (a === b) return true
    if (typeof a === 'string' && typeof b === 'string') return a === b
    if (typeof a === 'number' && typeof b === 'number') return a === b
    if (typeof a === 'object' && typeof b === 'object') {
        // potential keys: id, value, label
        const keys = ['id', 'value', 'label']
        // if any of the keys equals true, then return true
        for (const key of keys) {
            if (a[key] === true && b[key] === true) return true
        }
    }
    return false
}
export const findInArray = (array: any[], item: any): boolean => {
    return array.some((child) => comparison(child, item))
}

export default comparison
