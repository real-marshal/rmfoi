import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeValue } from '../constants'
import { actions } from '../store'
import { ThemeSwitcher } from './ThemeSwitcher'

const mockLight = ThemeValue.LIGHT
const mockDispatch = jest.fn()

jest.mock('@/app/store', () => ({
  useAppSelector: () => mockLight,
  useAppDispatch: () => mockDispatch,
}))

describe('ThemeSwitcher component', () => {
  it('renders the button to change theme', () => {
    const view = render(<ThemeSwitcher />)
    expect(view.baseElement).toMatchSnapshot()
  })

  it('opens the menu to choose a theme when the button is clicked and dispatches action on theme click', async () => {
    const user = userEvent.setup()
    const view = render(<ThemeSwitcher />)

    await user.click(screen.getByRole('button'))

    expect(view.baseElement).toMatchSnapshot()

    await user.click(screen.getByText(/dark/i))

    expect(mockDispatch).toHaveBeenCalledWith({
      type: actions.setCurrentTheme.type,
      payload: ThemeValue.DARK,
    })
  })
})
