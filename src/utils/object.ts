import type { Key, NestedRecord } from '@/types/common'

export const isObject = (value: unknown): value is object =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

// There are some very complex recursive typings for flattening nested objects
// that you could use here but I think that's not really worth it
function flattenObj<K extends Key, T>(obj: NestedRecord<K, T>, keySeparator?: string): Record<K, T>
function flattenObj(obj: object, keySeparator?: string): object
// eslint-disable-next-line func-style
function flattenObj(obj: object, keySeparator = '.'): object {
  const flattenObjectKey = (innerObj: object, key: string): object => {
    let innerResult: Record<string, unknown> = {}

    Object.entries(innerObj).forEach(([innerKey, innerValue]: [string, unknown]) => {
      const nestedKey = `${key}${keySeparator}${innerKey}`

      if (!isObject(innerValue)) return (innerResult[nestedKey] = innerValue)

      innerResult = {
        ...innerResult,
        ...flattenObjectKey(innerValue, nestedKey),
      }
    })

    return innerResult
  }

  let result: Record<string, unknown> = {}

  Object.entries(obj).forEach(([key, value]: [string, unknown]) => {
    if (!isObject(value)) return (result[key] = value)

    result = { ...result, ...flattenObjectKey(value, key) }
  })

  return result
}

export { flattenObj }

export const traverseObj = <T, U, O extends NestedRecord<string, T>>(
  obj: O,
  callback: (keys: string[], value: T) => U | undefined
): O => {
  const traverseKey = (innerObj: object, keys: string[]): object =>
    Object.entries(innerObj).reduce(
      (result, [innerKey, innerValue]: [string, T]) => ({
        ...result,
        [innerKey]: isObject(innerValue)
          ? traverseKey(innerValue, [...keys, innerKey])
          : callback([...keys, innerKey], innerValue) ?? innerValue,
      }),
      {}
    )

  return Object.entries(obj).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: isObject(value) ? traverseKey(value, [key]) : callback([key], value) ?? value,
    }),
    {}
  ) as O
}
