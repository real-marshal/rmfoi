import { useThemeSwitcher } from './useThemeSwitcher'
import { capitalize } from '@/utils'
import { List } from '@/components'
import { useRef, useState } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'
import styled from '@emotion/styled'
import { dt } from '../design-tokens'
import { useOutsideClick } from '@/hooks'

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
  padding: 8px;
  margin: 0;
  display: grid;
  place-items: center;

  &:hover {
    background: ${dt.theme.primary};
    color: ${dt.theme.background};
  }
`

const themes = ['system', 'light', 'dark'] as const

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme: currentTheme, actualTheme, setTheme } = useThemeSwitcher('dark')
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setIsOpen(false))

  return (
    <div className={className} ref={ref}>
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        {actualTheme === 'dark' ? <BsMoon /> : <BsSun />}
      </IconButton>
      {isOpen && (
        <List align='right'>
          {themes.map((theme) => (
            <List.ListItem
              key={theme}
              selected={currentTheme === theme}
              onClick={() => {
                setTheme(theme)
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
