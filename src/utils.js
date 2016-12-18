export function get(obj, path, _default) {
    if(typeof path === 'string') path = path.split('.');

    for(let i = 0; i < path.length; i++) {
        let key = path[i];
        if(!(obj && obj.hasOwnProperty(key))) return _default;
        obj = obj[key];
    }

    return obj;
}

export function pop(obj, path, _default) {
    if(typeof path === 'string') path = path.split('.');
    let lastKey = path.pop(),
        o = get(obj, path),
        value = o.hasOwnProperty(lastKey) ? o[lastKey] : _default;
    delete o[lastKey];
    return value;
}
