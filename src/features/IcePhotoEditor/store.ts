import store, { MakeCurrentDispatch, MakeCurrentState, MakeCurrentThunk } from '@/app/store'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AdjustmentKey, AdjustmentsState, applyAdjustments } from './adjustments'
import { PersistConfig, persistReducer, PersistedState } from 'redux-persist'
import { createIDBStorage } from '@/common/rp-storage-idb'

const NAME = 'icePhotoEditor' as const

interface AdjustmentChange {
  name: AdjustmentKey
  prevValue: Exclude<AdjustmentsState[AdjustmentKey], undefined>
  currentValue: Exclude<AdjustmentsState[AdjustmentKey], undefined>
}

interface HistoryElement {
  date: number
  adjustment: AdjustmentChange
}

interface IcePhotoEditorState {
  /**
   * The original image that is never modified
   */
  image?: ImageData
  /**
   * The image that is the result of all adjustments applied
   */
  currentImage?: ImageData
  historyStack: HistoryElement[]
  currentHistoryPointer: number
  loadedDate?: number
  filename?: string
}

// This slice will be injected asyncronously which is why we need separate types here
interface SliceState {
  [NAME]: IcePhotoEditorState & Partial<PersistedState>
}
export type CurrentRootState = MakeCurrentState<SliceState>
export type CurrentDispatch = MakeCurrentDispatch<SliceState>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type CurrentThunk<ReturnType = void> = MakeCurrentThunk<SliceState, ReturnType>

export const useCurrentDispatch: () => CurrentDispatch = useDispatch
export const useCurrentSelector: TypedUseSelectorHook<CurrentRootState> = useSelector

const initialState: IcePhotoEditorState = {
  historyStack: [],
  currentHistoryPointer: -1,
}

const persistConfig: PersistConfig<IcePhotoEditorState> = {
  key: NAME,
  // localStorage doesn't have enough space for this store
  storage: createIDBStorage(NAME),
  serialize: false,
  deserialize: false,
} as const

/*

REDUCERS

*/

const { actions, reducer } = createSlice({
  name: NAME,
  initialState,
  reducers: {
    loadImage: (state, action: PayloadAction<{ imageData: ImageData; filename: string }>) => {
      Object.assign(state, initialState)
      state.currentImage = state.image = action.payload.imageData
      state.filename = action.payload.filename

      state.loadedDate = Date.now()
    },
    addHistoryElement: (state, action: PayloadAction<HistoryElement>) => {
      state.historyStack.push(action.payload)
      state.currentHistoryPointer = state.historyStack.length - 1
    },
    updateLastHistoryElement: (state, action: PayloadAction<HistoryElement>) => {
      const { adjustment: lastAdjustment } = state.historyStack.at(-1) ?? {}

      if (!lastAdjustment) return

      Object.assign(lastAdjustment, action.payload.adjustment)
    },
    setCurrentHistoryElement: (state, action: PayloadAction<number>) => {
      const historyElementIndex = state.historyStack.findIndex(
        ({ date }) => date === action.payload
      )

      state.currentHistoryPointer = historyElementIndex

      if (action.payload === state.loadedDate) {
        state.currentHistoryPointer = -1
      }
    },
    applyAdjustments: (state) => {
      if (!state.image) return

      const historyStack = state.historyStack.slice(0, state.currentHistoryPointer + 1)

      const adjustmentsState = historyStack.reduce<AdjustmentsState>(
        (result, { adjustment }) => ({
          ...result,
          [adjustment.name]: adjustment.currentValue,
        }),
        {}
      )

      // eslint-disable-next-line unicorn/prefer-spread
      const newImageData = applyAdjustments(state.image.data.slice(0), adjustmentsState)

      state.currentImage = new ImageData(newImageData, state.image.width, state.image.height, {
        colorSpace: state.image.colorSpace,
      })
    },
  },
})

export { actions }

store.injectReducer(NAME, persistReducer(persistConfig, reducer))

/*

THUNKS

*/

export const updateAdjustments =
  (adjustment: AdjustmentChange): CurrentThunk =>
  (dispatch, getState) => {
    const { historyStack } = getState()[NAME]

    const { adjustment: lastAdjustment } = historyStack.at(-1) ?? {}
    const { adjustment: prevAdjustment } =
      historyStack.findLast(
        (historyElement) =>
          historyElement.adjustment.name === adjustment.name &&
          historyElement.adjustment !== lastAdjustment
      ) ?? {}

    if (prevAdjustment) {
      adjustment.prevValue = prevAdjustment.currentValue
    }

    if (lastAdjustment && lastAdjustment.name === adjustment.name) {
      dispatch(actions.updateLastHistoryElement({ date: Date.now(), adjustment }))
    } else {
      dispatch(actions.addHistoryElement({ date: Date.now(), adjustment }))
    }

    dispatch(actions.applyAdjustments())
  }

/*

SELECTORS

*/

export const selectImage = (state: CurrentRootState) => state[NAME].image

export const selectCurrentImage = (state: CurrentRootState) => state[NAME].currentImage

export const selectHistoryStack = (state: CurrentRootState) => state[NAME].historyStack

export const selectLoadedDate = (state: CurrentRootState) => state[NAME].loadedDate

export const selectFilename = (state: CurrentRootState) => state[NAME].filename

export const selectPersistRehydrated = (state: CurrentRootState) => state[NAME]._persist?.rehydrated

export const selectCurrentHistoryPointer = (state: CurrentRootState) =>
  state[NAME].currentHistoryPointer

export const selectHistory = createSelector(
  selectHistoryStack,
  selectLoadedDate,
  (historyStack, loadedDate) => [
    ...(loadedDate
      ? [
          {
            date: loadedDate,
            adjustment: {
              name: 'Image Loaded',
              prevValue: '',
              currentValue: '',
            },
          },
        ]
      : []),
    ...historyStack,
  ]
)

export const selectAdjustmentsStateStrings = createSelector(
  selectHistoryStack,
  selectCurrentHistoryPointer,
  (historyStack, currentHistoryPointer) =>
    historyStack.slice(0, currentHistoryPointer + 1).reduce<Partial<Record<AdjustmentKey, string>>>(
      (result, { adjustment }) => ({
        ...result,
        [adjustment.name]: adjustment.currentValue.toString(),
      }),
      {}
    )
)
