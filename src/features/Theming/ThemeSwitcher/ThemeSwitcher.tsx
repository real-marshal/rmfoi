import { capitalize } from '@/utils'
import { List } from '@/components'
import { useRef, useState } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'
import styled from '@emotion/styled'
import { dt } from '../design-tokens'
import { useOutsideClick } from '@/hooks'
import { ThemeValue } from '../constants'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { actions, selectActualTheme, selectCurrentTheme } from '../store'

interface ThemeSwitcherProps {
  className?: string
}

const IconButton = styled.button`
  color: ${dt.theme.primary};
  border: 2px solid ${dt.theme.primary};
  border-radius: 10px;
  cursor: pointer;
  font-size: 2rem;
  background: ${dt.theme.background};
  padding: ${dt.padding.md};
  margin: 0;
  display: grid;
  place-items: center;

  &:hover {
    background: ${dt.theme.primary};
    color: ${dt.theme.background};
  }
`

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => setIsOpen(false))

  const currentTheme = useAppSelector(selectCurrentTheme)
  const actualTheme = useAppSelector(selectActualTheme)

  const dispatch = useAppDispatch()

  return (
    <div className={className} ref={ref}>
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        {actualTheme === ThemeValue.DARK ? <BsMoon /> : <BsSun />}
      </IconButton>
      {isOpen && (
        <List align='right'>
          {Object.values(ThemeValue).map((theme) => (
            <List.ListItem
              key={theme}
              selected={currentTheme === theme}
              onClick={() => {
                dispatch(actions.setCurrentTheme(theme))
                setIsOpen(false)
              }}
              value={theme}
            >
              {capitalize(theme)}
            </List.ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export { ThemeSwitcher }
export type { ThemeSwitcherProps }
