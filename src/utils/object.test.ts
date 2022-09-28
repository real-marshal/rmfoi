import { flattenObj, isObject, traverseObj } from './object'

describe('isObject', () => {
  it('should return true if an object is passed', () => {
    expect(isObject({ a: 1 })).toBeTrue()
  })

  it('should return true if an empty object is passed', () => {
    expect(isObject({})).toBeTrue()
  })

  it('should return false if an array is passed', () => {
    expect(isObject([1, 2])).toBeFalse()
  })

  it('should return false if null is passed', () => {
    expect(isObject(null)).toBeFalse()
  })

  it('should return false if undefined is passed', () => {
    // eslint-disable-next-line no-undefined, unicorn/no-useless-undefined
    expect(isObject(undefined)).toBeFalse()
  })

  it('should return false if a number is passed', () => {
    expect(isObject(4)).toBeFalse()
  })

  it('should return false if a string is passed', () => {
    expect(isObject('test')).toBeFalse()
  })

  it('should return false if a boolean is passed', () => {
    expect(isObject(false)).toBeFalse()
  })

  it('should return false if an arrow function is passed', () => {
    expect(isObject(() => null)).toBeFalse()
  })

  it('should return false if an anonymous function is passed', () => {
    expect(
      // eslint-disable-next-line func-names, prefer-arrow-callback
      isObject(function () {
        return null
      })
    ).toBeFalse()
  })

  it('should return false if a function is passed', () => {
    // eslint-disable-next-line func-style, unicorn/consistent-function-scoping, max-statements-per-line
    function someFunction() {
      return null
    }
    expect(isObject(someFunction)).toBeFalse()
  })
})

describe('flattenObj', () => {
  it('should flatten nested objects', () => {
    expect(flattenObj({ a: 1, b: { c: 2, d: 3, e: { f: 4, g: { h: 5 } } } })).toEqual({
      a: 1,
      'b.c': 2,
      'b.d': 3,
      'b.e.f': 4,
      'b.e.g.h': 5,
    })
  })

  it('should use passed separator', () => {
    expect(flattenObj({ a: 1, b: { c: 2, d: 3, e: { f: 4, g: { h: 5 } } } }, '-')).toEqual({
      a: 1,
      'b-c': 2,
      'b-d': 3,
      'b-e-f': 4,
      'b-e-g-h': 5,
    })
  })

  it('should not do anything to already flat objects', () => {
    expect(flattenObj({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('should work with empty objects', () => {
    expect(flattenObj({})).toEqual({})
  })
})

describe('traverseObj', () => {
  it('should traverse nested objects and return the same copy of object', () => {
    const input = { a: 1, b: { c: 2, d: 3, e: { f: 4, g: { h: 5 } } } }
    const mockFn = jest.fn()

    const output = traverseObj(input, mockFn)

    expect(mockFn.mock.calls[0]).toEqual([['a'], 1])
    expect(mockFn.mock.calls[1]).toEqual([['b', 'c'], 2])
    expect(mockFn.mock.calls[2]).toEqual([['b', 'd'], 3])
    expect(mockFn.mock.calls[3]).toEqual([['b', 'e', 'f'], 4])
    expect(mockFn.mock.calls[4]).toEqual([['b', 'e', 'g', 'h'], 5])
    expect(mockFn.mock.calls[5]).toBeUndefined()

    expect(input).toEqual(output)
  })

  it('should mutate the values if callback returns non-nullish value', () => {
    const mockFn = jest.fn((keys: string[], value: number) => `${keys.join('.')} - ${value * 2}`)

    const input = { a: 1, b: { c: 2, d: 3, e: { f: 4, g: { h: 5 } } } }
    const output = {
      a: 'a - 2',
      b: { c: 'b.c - 4', d: 'b.d - 6', e: { f: 'b.e.f - 8', g: { h: 'b.e.g.h - 10' } } },
    }

    expect(traverseObj(input, mockFn)).toEqual(output)
  })

  it('should work with flat objects', () => {
    const input = { a: 1, b: 2 }
    const mockFn = jest.fn()

    const output = traverseObj(input, mockFn)

    expect(mockFn.mock.calls[0]).toEqual([['a'], 1])
    expect(mockFn.mock.calls[1]).toEqual([['b'], 2])
    expect(mockFn.mock.calls[2]).toBeUndefined()

    expect(input).toEqual(output)
  })

  it('should work with empty objects', () => {
    const input = {}
    const mockFn = jest.fn()

    const output = traverseObj(input, mockFn)

    expect(mockFn).not.toHaveBeenCalled()

    expect(input).toEqual(output)
  })
})
