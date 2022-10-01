import { dt } from '@/features/Theming'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, ReactNode } from 'react'
import { ListItem } from './ListItem'

interface ListProps {
  children: ReactNode
  align?: 'left' | 'right'
}

const StyledUL = styled.ul<Pick<ListProps, 'align'>>`
  background: linear-gradient(${dt.theme.background}, ${dt.theme.background}) padding-box,
    ${dt.theme.gradientBlue};
  border: 4px solid transparent;
  border-radius: 10px;
  z-index: ${dt.z.menu};
  padding: 0;
  width: fit-content;
  position: absolute;

  ${({ align }) =>
    align === 'right' &&
    css`
      right: 0;
    `}
`

const List = forwardRef<HTMLUListElement, ListProps>(({ children, align = 'left' }, ref) => (
  <StyledUL ref={ref} align={align}>
    {children}
  </StyledUL>
))

List.displayName = 'List'

const ListCompound = Object.assign(List, { ListItem })

export { ListCompound as List }
export type { ListProps }
