// string
export const isString = (value: unknown): value is string => typeof value === 'string';

export const isStringFull = (value: string): boolean => value.length > 0;

export const isEmptyString = (value: string): boolean => value.length === 0;

// nil
export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isNil = <T>(value: T): value is Extract<T, undefined | null> =>
  value == null;

export const isDefined = <T>(value: T): value is Exclude<T, undefined | null> =>
  value != null;

// object
export const isObject = <T>(value: T): value is Extract<T, object> =>
  typeof value === 'object' && value != null;

export const isObjectFull = (value: object): boolean =>
  isObject(value) && Object.keys(value).length > 0;

export const isEmptyObject = (value: object): boolean => Object.keys(value).length === 0;

// array
export const isArray = <T>(value: T): value is Extract<T, unknown[]> =>
  Array.isArray(value);

export const isArrayFull = (value: unknown[]): boolean => value.length > 0;

export const isEmptyArray = (value: unknown[]): boolean => value.length === 0;
