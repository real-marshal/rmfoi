import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeSwitcher } from './ThemeSwitcher'

jest.mock('./useThemeSwitcher', () => ({
  useThemeSwitcher: () => ({ theme: 'system', setTheme: () => null }),
}))

describe('ThemeSwitcher component', () => {
  it('renders the button to change theme', () => {
    const view = render(<ThemeSwitcher />)
    expect(view.baseElement).toMatchSnapshot()
  })

  it('opens the menu to choose a theme when the button is clicked', async () => {
    const user = userEvent.setup()
    const view = render(<ThemeSwitcher />)

    await user.click(screen.getByRole('button'))

    expect(view.baseElement).toMatchSnapshot()
  })
})
