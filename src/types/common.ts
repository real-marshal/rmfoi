// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Key = keyof any

export type NestedArray<T> = T[] | Array<NestedArray<T>>

export type NestedRecord<K extends Key, T> = {
  [key in K]: T | NestedRecord<K, T>
}
