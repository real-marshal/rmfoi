import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import {
  actions,
  evaluateNewPull,
  selectEmojiArrays,
  useCurrentDispatch,
  useCurrentSelector,
} from './store'
import { useSlotMachineAnimation } from './useSlotMachineAnimation'
import { Emoji, emojis, emojisMap, loseMessages } from './constants'
import { pickRandom } from '@/utils'
import { CenterRowOverlay, Column, Columns, EmojiElement, PullButton, Wrapper } from './styles'

interface EmojiSlotMachineProps {
  elementsInColumn: number
}

interface WonPullState {
  status: 'won'
  wonEmoji: Emoji
}

interface OtherPullState {
  status: 'pending' | 'lost'
}

type PullState = WonPullState | OtherPullState

const EmojiSlotMachine = ({ elementsInColumn = 5 }: EmojiSlotMachineProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const originalEmojiArrays = useCurrentSelector(selectEmojiArrays)

  const [pullState, setPullState] = useState<PullState>({ status: 'pending' })

  const dispatch = useCurrentDispatch()

  useEffect(() => {
    dispatch(
      actions.initialize({
        maxIndexToWin: emojis.length - elementsInColumn - 1,
      })
    )
  }, [dispatch, elementsInColumn])

  const {
    startAnimation,
    isBusy,
    prependedSlotsArrays: emojiArrays,
  } = useSlotMachineAnimation({
    ref,
    slotsArrays: originalEmojiArrays,
    elementsInColumn,
    slotElementQuery: '.esm__emoji',
    columnElementQuery: '.esm__column',
  })

  const pullClickHandler: MouseEventHandler = async () => {
    setPullState({ status: 'pending' })

    const { wonEmojiIndexes, wonEmoji } = dispatch(evaluateNewPull()) ?? {}

    await startAnimation(wonEmojiIndexes)

    setPullState(wonEmoji ? { status: 'won', wonEmoji } : { status: 'lost' })
  }

  return (
    <Wrapper>
      <Columns ref={ref}>
        <CenterRowOverlay pullState={pullState}>
          <span>
            {pullState.status === 'won' && emojisMap[pullState.wonEmoji]}
            {pullState.status === 'lost' && pickRandom(loseMessages)}
          </span>
        </CenterRowOverlay>
        {emojiArrays.map((shuffledEmojis, ind) => (
          <Column key={ind} className='esm__column' elementsInColumn={elementsInColumn}>
            {shuffledEmojis.map((emoji, index) => (
              <EmojiElement key={index} className='esm__emoji'>
                {emoji}
              </EmojiElement>
            ))}
          </Column>
        ))}
      </Columns>
      <PullButton onClick={pullClickHandler} disabled={isBusy}>
        Pull
      </PullButton>
    </Wrapper>
  )
}

export { EmojiSlotMachine }
export type { EmojiSlotMachineProps, PullState }
