import { randomInt } from './number'

describe('randomInt', () => {
  it('should return random integer from min incl. to max incl.', () => {
    expect(randomInt(1, 2)).toBeGreaterThanOrEqual(1)
    expect(randomInt(1, 2)).toBeLessThanOrEqual(2)
  })
})
