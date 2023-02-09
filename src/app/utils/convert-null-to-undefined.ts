type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends Date
  ? T
  : {
      [K in keyof T]: T[K] extends (infer U)[]
        ? RecursivelyReplaceNullWithUndefined<U>[]
        : RecursivelyReplaceNullWithUndefined<T[K]>;
    };

/**
 * Convert null value to undefined in data
 */
const convertNullToUndefined = <T>(data: T): RecursivelyReplaceNullWithUndefined<T> => {
  const parserData = JSON.parse(JSON.stringify(data)) as T;

  if (parserData === null || parserData === undefined) {
    return undefined as RecursivelyReplaceNullWithUndefined<T>;
  }

  if (parserData.constructor.name === 'Array') {
    Object.keys(parserData).forEach(key => {
      parserData[key as keyof T] = convertNullToUndefined(parserData[key as keyof T]) as (T & object)[keyof T];
    });
  }

  if (parserData.constructor.name === 'Object') {
    Object.keys(parserData).forEach(key => {
      parserData[key as keyof T] = convertNullToUndefined(parserData[key as keyof T]) as (T & object)[keyof T];
    });
  }

  return parserData as RecursivelyReplaceNullWithUndefined<T>;
};

export default convertNullToUndefined;
