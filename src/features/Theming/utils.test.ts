import { designTokensToCSSVarNames, designTokensToCSSVarsStyle } from './utils'

describe('designTokensToCSSVarsStyle', () => {
  it('should return a string with CSS style with variables', () => {
    expect(
      designTokensToCSSVarsStyle({
        padding: { sm: '2px', md: '4px' },
        margin: { sm: '1px', md: '3px' },
      })
    ).toBe(
      `--dt-padding-sm: 2px;
--dt-padding-md: 4px;
--dt-margin-sm: 1px;
--dt-margin-md: 3px;`
    )
  })
})

describe('designTokensToCSSVarNames', () => {
  it('should return an object that maps design token keys to CSS variable names wrapped in var()', () => {
    expect(
      designTokensToCSSVarNames({
        padding: { sm: '2px', md: '4px' },
        margin: { sm: '1px', md: '3px' },
      })
    ).toEqual({
      padding: { sm: 'var(--dt-padding-sm)', md: 'var(--dt-padding-md)' },
      margin: { sm: 'var(--dt-margin-sm)', md: 'var(--dt-margin-md)' },
    })
  })
})
