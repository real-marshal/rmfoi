import store from '@/app/store'
import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import * as stories from './EmojiSlotMachine.stories'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('./store', () => ({
  ...jest.requireActual('./store'),
  selectEmojiArrays: () => [
    ['🚀', '💎', '👑'],
    ['🚀', '💎', '👑'],
    ['🚀', '💎', '👑'],
  ],
}))

describe('EmojiSlotMachine component', () => {
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
