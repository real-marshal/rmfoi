import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'
import * as stories from './Card.stories'

describe('Card component', () => {
  const testStories = Object.values(composeStories(stories)).map(
    (Story) => [Story.storyName, Story] as [string, typeof Story]
  )

  it.each(testStories)('renders %s story', (_, Story) => {
    const view = render(<Story />)
    expect(view.baseElement).toMatchSnapshot()
  })
})
