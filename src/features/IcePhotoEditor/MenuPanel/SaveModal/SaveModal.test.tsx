import store from '@/app/store'
import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import * as stories from './SaveModal.stories'

describe('SaveModal component', () => {
  const testStories = Object.values(composeStories(stories)).map(
    (Story) => [Story.storyName, Story] as [string, typeof Story]
  )

  it.each(testStories)('renders %s story', (_, Story) => {
    const view = render(
      <Provider store={store}>
        <Story />
      </Provider>
    )
    expect(view.baseElement).toMatchSnapshot()
  })
})
