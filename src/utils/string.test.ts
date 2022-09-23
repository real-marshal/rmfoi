import { capitalize } from './string'

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('test')).toBe('Test')
  })

  it('should work with empty strings', () => {
    expect(capitalize('')).toBe('')
  })
})
