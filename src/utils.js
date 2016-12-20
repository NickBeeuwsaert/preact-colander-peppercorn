function getitem(obj, item) {
  if(!(obj.hasOwnProperty(item))) {
    throw new Error(`Property '${item}' not found!`);
  }
  return obj[item];
}

export function get(obj, path, _default) {
  if(typeof path === 'string') path = path.split('.');

  for(let i = 0; i < path.length; i++) {
    try {
      obj = getitem(obj, path[i]);
    } catch(e) {
      if(_default === void 0) throw e;
      return _default;
    }
  }

  return obj;
}

export function pop(obj, path, _default) {
  if(typeof path === 'string') path = path.split('.');

  let lastKey = path.pop(), value;
  try {
    if(path.length) obj = get(obj, path);
    value = getitem(obj, lastKey);
    delete obj[lastKey];
  }catch(e) {
    if(_default === void 0) throw e;
    return _default;
  }
  return value;
}
