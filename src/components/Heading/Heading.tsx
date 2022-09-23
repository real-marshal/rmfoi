import type { ReactNode } from 'react'
import styled from '@emotion/styled'
import { dt } from '@/features/Theming'

interface HeadingProps {
  children: ReactNode
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

const StyledH1 = styled.h1`
  font-family: sans-serif;
  color: ${dt.theme.primary};
  border-bottom: 4px solid;
  border-image: ${dt.colors.gradient} 1;
  padding-bottom: 10px;
  margin: 0;
`

const Heading = ({ children, type, className }: HeadingProps) => (
  <StyledH1 className={className} as={type}>
    {children}
  </StyledH1>
)

export { Heading }
export type { HeadingProps }
