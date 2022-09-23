import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'
import * as stories from './List.stories'

describe('List component', () => {
  const testStories = Object.values(composeStories(stories)).map(
    (Story) => [Story.storyName, Story] as const
  )

  it.each(testStories)('renders %s story', (_, Story) => {
    const view = render(<Story />)
    expect(view.baseElement).toMatchSnapshot()
  })
})
