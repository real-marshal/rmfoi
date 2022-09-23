import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import * as stories from './Button.stories'

const testStories = Object.values(composeStories(stories)).map(
  (Story) => [Story.storyName, Story] as const
)

describe('Button component', () => {
  it.each(testStories)('renders %s story', (_, Story) => {
    const view = render(<Story />)
    expect(view.baseElement).toMatchSnapshot()
  })

  it('calls onClick with event when clicked', async () => {
    const user = userEvent.setup()
    const clickHandler = jest.fn()

    render(<Button onClick={clickHandler}>Click me daddy</Button>)

    await user.click(screen.getByRole('button', { name: 'Click me daddy' }))

    expect(clickHandler).toHaveBeenCalled()
  })
})
