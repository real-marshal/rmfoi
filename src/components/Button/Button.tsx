import type { MouseEventHandler, ReactNode } from 'react'
import styled from '@emotion/styled'
import { dt } from '@/features/Theming'
import { css } from '@emotion/react'

interface ButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  secondary?: boolean
  disabled?: boolean
}

const StyledButton = styled.button<{ secondary: boolean }>`
  background: ${dt.theme.gradientBlue};
  padding: ${dt.padding.md} ${dt.padding.lg};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: ${dt.theme.background};
  font-weight: bold;

  ${({ secondary }) =>
    secondary &&
    css`
      background: ${dt.theme.gradientBlueGreyed};
    `}
`

const Button = ({ children, onClick, secondary = false, disabled }: ButtonProps) => (
  <StyledButton onClick={onClick} secondary={secondary} disabled={disabled}>
    {children}
  </StyledButton>
)

export { Button }
export type { ButtonProps }
