import type { ReactNode } from 'react'
import styled from '@emotion/styled'
import { dt } from '@/features/Theming'
import { css } from '@emotion/react'

interface HeadingProps {
  children: ReactNode
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  underline?: boolean
}

const StyledH1 = styled.h1<Pick<HeadingProps, 'underline'>>`
  font-family: monospace;
  font-weight: regular;
  color: ${dt.theme.primary};
  margin: 0;

  ${({ underline }) =>
    underline &&
    css`
      border-bottom: 4px solid;
      border-image: ${dt.theme.gradientBlue} 1;
      padding-bottom: ${dt.padding.md};
    `}
`

const Heading = ({ children, type, className, underline = true }: HeadingProps) => (
  <StyledH1 className={className} as={type} underline={underline}>
    {children}
  </StyledH1>
)

export { Heading }
export type { HeadingProps }
