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

type GetFieldType<O, K> = K extends `${infer Left}.${infer Right}`
  ? Left extends keyof O
    ? GetFieldType<Exclude<O[Left], undefined>, Right> | Extract<O[Left], undefined>
    : undefined
  : K extends keyof O
  ? O[K]
  : undefined

export const get = <O, K extends string, D = GetFieldType<O, K>>(
  obj: O,
  key: K,
  defaultValue?: D
): GetFieldType<O, K> | D | undefined => {
  const value = key
    .split('.')
    .reduce(
      (value: Record<string, unknown> | unknown, key) =>
        isObject(value) ? (value as Record<string, unknown>)[key] : value,
      obj
    ) as GetFieldType<O, K>

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return value === undefined ? (defaultValue as D) : value
}

// Go fuck yourself eslint
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export const set = (obj: object, key: string, value: unknown) => {
  const keys = key.split('.')

  const targetObj = keys.slice(0, -1).reduce((result: any, key) => {
    if (isObject(result[key])) return result[key]

    if (!Object.hasOwn(result, key)) {
      result[key] = {}
      return result[key]
    }

    return {}
  }, obj)

  targetObj[keys.at(-1)!] = value
}

/* eslint-enable @typescript-eslint/no-explicit-any*/
/* eslint-enable @typescript-eslint/no-unsafe-argument */
/* eslint-enable @typescript-eslint/no-unsafe-return */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
