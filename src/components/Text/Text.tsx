import { dt } from '@/features/Theming'
import styled from '@emotion/styled'
import type { ElementType, ReactNode } from 'react'

interface TextProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  type?: ElementType
  className?: string
}

const StyledSpan = styled.span<Pick<Required<TextProps>, 'size'>>`
  color: ${dt.theme.primary};
  font-size: ${({ size }) => dt.fontSize[size]};
`

const Text = ({ children, type = 'span', size = 'md', className }: TextProps) => (
  <StyledSpan as={type} size={size} className={className}>
    {children}
  </StyledSpan>
)

export { Text }
export type { TextProps }
