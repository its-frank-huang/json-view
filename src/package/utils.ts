export function isObject(value: any) {
  var type = typeof value;
  return type === 'function' || (type === 'object' && !!value);
}

export function isArray(value: any) {
  return Array.isArray(value);
}

export function isString(value: any) {
  return typeof value === 'string';
}

export function isNumber(value: any) {
  return typeof value === 'bigint' || typeof value === 'number';
}

export function isBoolean(value: any) {
  return typeof value === 'boolean';
}

export function isNull(value: any) {
  return typeof value === null;
}
