import { dt } from '@/features/Theming'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { LiHTMLAttributes, ReactNode } from 'react'

interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode
  selected?: boolean
}

const StyledLI = styled.li<ListItemProps>`
  color: ${dt.theme.primary};
  background-color: ${dt.theme.background};
  list-style: none;
  padding: ${dt.padding.lg} ${dt.padding.xl};
  cursor: pointer;

  &:first-of-type {
    border-radius: 7px 7px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 7px 7px;
  }

  &:hover {
    color: ${dt.theme.background};
    background-color: ${dt.theme.primary};
  }

  ${({ selected }) =>
    selected &&
    css`
      color: ${dt.theme.background};
      background-color: ${dt.theme.primary};
    `}
`

const ListItem = ({ children, ...props }: ListItemProps) => (
  <StyledLI {...props}>{children}</StyledLI>
)

export { ListItem }
export type { ListItemProps }
