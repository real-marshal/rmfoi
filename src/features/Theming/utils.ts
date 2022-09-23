import type { NestedRecord } from '@/types/common'
import { flattenObj, traverseObj } from '@/utils'

export const designTokensToCSSVarsStyle = (
  designTokens: NestedRecord<string, string>,
  prefix = 'dt'
) =>
  Object.entries(flattenObj(designTokens, '-')).reduce(
    (result, [key, value]) => `${result ? `${result}\n` : ''}--${prefix}-${key}: ${value};`,
    ''
  )

export const designTokensToCSSVarNames = <T extends NestedRecord<string, string>>(
  designTokens: T,
  prefix = 'dt'
): T => traverseObj(designTokens, (keys) => `var(--${prefix}-${keys.join('-')})`)
