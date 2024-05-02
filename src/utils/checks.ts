export const isString = (value: unknown): value is string => typeof value === 'string';
export const isStringFull = (value: unknown): value is string =>
  isString(value) && value.length > 0;

export const isNull = (value: unknown): value is null => value === null;
export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isNil = <T>(value: T): value is Extract<T, undefined | null> =>
  value == null;

export const isDefined = <T>(value: T): value is Exclude<T, undefined | null> =>
  value != null;

export const isObject = <T>(value: T): value is Extract<T, object> =>
  typeof value === 'object' && value != null;
export const isObjectFull = <T>(value: T): value is Extract<T, object> =>
  isObject(value) && Object.keys(value).length > 0;

export const isArray = <T>(value: T): value is Extract<T, unknown[]> =>
  Array.isArray(value);
export const isArrayFull = <T>(value: T): value is Extract<T, object> =>
  isArray(value) && value.length > 0;
