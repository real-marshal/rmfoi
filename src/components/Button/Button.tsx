import type { MouseEventHandler, ReactNode } from 'react'
import styled from '@emotion/styled'
import { dt } from '@/features/Theming'

interface ButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const StyledButton = styled.button`
  background: ${dt.colors.gradient};
  padding: ${dt.padding.lg} ${dt.padding.xl};
  border: none;
  border-radius: 10px;
  cursor: pointer;
`

const Button = ({ children, onClick }: ButtonProps) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
)

export { Button }
export type { ButtonProps }
