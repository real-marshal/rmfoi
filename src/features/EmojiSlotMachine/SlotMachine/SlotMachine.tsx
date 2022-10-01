import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import {
  actions,
  evaluateNewPull,
  selectEmojiArrays,
  selectMode,
  useCurrentDispatch,
  useCurrentSelector,
} from '../store'
import { useSlotMachineAnimation } from './useSlotMachineAnimation'
import { Emoji, emojis, EmojiSlotMachineMode, emojisMap, loseMessages } from '../constants'
import { pickRandom } from '@/utils'
import {
  CenterRowOverlay,
  Column,
  Columns,
  EmojiElement,
  ModeButton,
  ModesContainer,
  PullButton,
  Wrapper,
} from './styles'
import { GeneralStatistics } from '../GeneralStatistics'
import { EmojiStatistics } from '../EmojiStatistics'

interface SlotMachineProps {
  elementsInColumn?: number
}

interface WonPullState {
  status: 'won'
  wonEmoji: Emoji
}

interface LostPullState {
  status: 'lost'
  message: string
}

interface OtherPullState {
  status: 'pending'
}

type PullState = WonPullState | LostPullState | OtherPullState

const SlotMachine = ({ elementsInColumn = 5 }: SlotMachineProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const originalEmojiArrays = useCurrentSelector(selectEmojiArrays)
  const mode = useCurrentSelector(selectMode)

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

    setPullState(
      wonEmoji ? { status: 'won', wonEmoji } : { status: 'lost', message: pickRandom(loseMessages) }
    )
  }

  return (
    <Wrapper>
      <GeneralStatistics isBusy={isBusy} />
      <ModesContainer>
        {Object.values(EmojiSlotMachineMode).map((modeKey) => (
          <ModeButton
            key={modeKey}
            disabled={isBusy}
            selected={mode === modeKey}
            onClick={() => dispatch(actions.updateMode(modeKey))}
          >
            {modeKey}
          </ModeButton>
        ))}
      </ModesContainer>
      <Columns ref={ref}>
        <CenterRowOverlay pullState={pullState}>
          <span>
            {pullState.status === 'won' && emojisMap[pullState.wonEmoji]}
            {pullState.status === 'lost' && pullState.message}
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
        {isBusy ? '...' : 'Pull'}
      </PullButton>
      <EmojiStatistics isBusy={isBusy} />
    </Wrapper>
  )
}

export { SlotMachine }
export type { SlotMachineProps, PullState }
