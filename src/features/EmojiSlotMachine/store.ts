import store, { MakeCurrentDispatch, MakeCurrentState, MakeCurrentThunk } from '@/app/store'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Emoji, emojis, EmojiSlotMachineMode, modeData } from './constants'
import { getShuffledEmojiArrays, getWonEmojiIndexes, EmojiSwapData, tryToWin } from './utils'

const NAME = 'emojiSlotMachine' as const

interface EmojiSlotMachineState {
  mode: EmojiSlotMachineMode
  columns: number
  emojiArrays: Emoji[][]
  chance: number
  chanceIncrement: number
  minIndexToWin: number
  maxIndexToWin: number
  stats: {
    pulls: number
    wonEmojis: Partial<Record<Emoji, number>>
  }
}

// This slice will be injected asyncronously which is why we need separate types here
interface SliceState {
  [NAME]: EmojiSlotMachineState
}
export type CurrentRootState = MakeCurrentState<SliceState>
export type CurrentDispatch = MakeCurrentDispatch<SliceState>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type CurrentThunk<ReturnType = void> = MakeCurrentThunk<SliceState, ReturnType>

export const useCurrentDispatch: () => CurrentDispatch = useDispatch
export const useCurrentSelector: TypedUseSelectorHook<CurrentRootState> = useSelector

const initialState: EmojiSlotMachineState = {
  mode: EmojiSlotMachineMode.STANDARD,
  columns: 3,
  emojiArrays: getShuffledEmojiArrays(3),
  minIndexToWin: 0,
  maxIndexToWin: emojis.length - 1,
  stats: {
    pulls: 0,
    wonEmojis: {},
  },
  ...modeData[EmojiSlotMachineMode.STANDARD],
}

/*

REDUCERS

*/

const { actions, reducer } = createSlice({
  name: NAME,
  initialState,
  reducers: {
    initialize: (
      state,
      action: PayloadAction<
        Partial<Pick<EmojiSlotMachineState, 'columns' | 'mode' | 'minIndexToWin' | 'maxIndexToWin'>>
      >
    ) => {
      Object.assign(state, action.payload)
    },
    setColumns: (state, action: PayloadAction<number>) => {
      state.columns = action.payload
    },
    setEmojiArrays: (state, action: PayloadAction<EmojiSlotMachineState['emojiArrays']>) => {
      state.emojiArrays = action.payload
    },
    win: (state, action: PayloadAction<Emoji>) => {
      state.stats.pulls++

      Object.assign(state, modeData[state.mode])

      const wonEmoji = state.stats.wonEmojis[action.payload]
      state.stats.wonEmojis[action.payload] = wonEmoji ? wonEmoji + 1 : 1
    },
    lose: (state) => {
      state.stats.pulls++
      state.chance += state.chanceIncrement
    },
    swapEmojis: (state, action: PayloadAction<EmojiSwapData[]>) => {
      const { emojiArrays } = state

      action.payload.forEach(
        ({ arrayIndex, emojiInd1, emojiInd2 }) =>
          ([emojiArrays[arrayIndex]![emojiInd1]!, emojiArrays[arrayIndex]![emojiInd2]!] = [
            emojiArrays[arrayIndex]![emojiInd2]!,
            emojiArrays[arrayIndex]![emojiInd1]!,
          ])
      )
    },
    updateMode: (state, action: PayloadAction<EmojiSlotMachineMode>) => {
      state.mode = action.payload
      Object.assign(state, modeData[state.mode])
    },
  },
})

export { actions }

store.injectReducer(NAME, reducer)

/*

THUNKS

*/

// shuffleEmojiArrays has impure RNG logic so it shouldn't be in the reducer
export const shuffleEmojiArrays = (): CurrentThunk => (dispatch, getState) => {
  const { columns } = getState()[NAME]
  const shuffledEmojis = getShuffledEmojiArrays(columns)

  dispatch(actions.setEmojiArrays(shuffledEmojis))
}

export const updateColumns =
  (columns: number): CurrentThunk =>
  (dispatch) => {
    dispatch(actions.setColumns(columns))
    dispatch(shuffleEmojiArrays())
  }

export const evaluateNewPull =
  (): CurrentThunk<{ wonEmojiIndexes: number[]; wonEmoji: Emoji } | undefined> =>
  (dispatch, getState) => {
    dispatch(shuffleEmojiArrays())

    const { chance, minIndexToWin, maxIndexToWin, emojiArrays } = getState()[NAME]
    const wonEmoji = tryToWin({ chance, minIndexToWin, maxIndexToWin })

    if (!wonEmoji) {
      dispatch(actions.lose())
      return
    }

    dispatch(actions.win(wonEmoji))

    const { wonEmojiIndexes, emojisToSwap } = getWonEmojiIndexes({
      emojiArrays,
      wonEmoji,
      minIndexToWin,
      maxIndexToWin,
    })
    dispatch(actions.swapEmojis(emojisToSwap))

    return { wonEmojiIndexes, wonEmoji }
  }

/*

SELECTORS

*/

export const selectEmojiArrays = (state: CurrentRootState) => state[NAME].emojiArrays

export const selectMode = (state: CurrentRootState) => state[NAME].mode

export const selectChance = (state: CurrentRootState) => state[NAME].chance

export const selectChanceIncrement = (state: CurrentRootState) => state[NAME].chanceIncrement

export const selectStats = (state: CurrentRootState) => state[NAME].stats

export const selectGeneralStats = createSelector(
  selectStats,
  selectChance,
  selectChanceIncrement,
  ({ pulls, wonEmojis }, chance, chanceIncrement) => {
    const wins = Object.values(wonEmojis).reduce((result, wins) => result + wins, 0)

    return {
      pulls,
      wins,
      loses: pulls - wins,
      WR: pulls ? wins / pulls : 0,
      chance,
      chanceIncrement,
    }
  }
)

export const selectdEmojiStats = createSelector(selectStats, ({ wonEmojis }) => {
  const wonEmojisNumber = Object.keys(wonEmojis).length

  return {
    wonEmojisNumber,
    leftEmojis: emojis.length - wonEmojisNumber,
    wonEmojis,
  }
})
