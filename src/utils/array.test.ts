import { pickRandom, shuffle } from './array'

describe('shuffle', () => {
  it('should shuffle array elements by mutating it', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const originalArr = [...arr]

    expect(shuffle(arr)).not.toEqual(originalArr)
  })
})

describe('pickRandom', () => {
  it('should pick random element from an array', () => {
    const arr = [1, 2, 3]

    expect(pickRandom(arr)).toBeOneOf(arr)
  })
})
