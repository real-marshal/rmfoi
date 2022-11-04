import { themeReducer } from '@/features/Theming'
import {
  AnyAction,
  combineReducers,
  configureStore,
  Dispatch,
  Reducer,
  ThunkAction,
} from '@reduxjs/toolkit'
import type { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import type { ExtractDispatchExtensions } from '@reduxjs/toolkit/dist/tsHelpers'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { get, set } from '../utils'
import { produce } from 'immer'

const nonSerializableFields = [
  {
    key: 'icePhotoEditor.image',
    replacement: '<ImageData>',
  },
  {
    key: 'icePhotoEditor.currentImage',
    replacement: '<ImageData>',
  },
]

const staticReducers = {
  theme: themeReducer,
}

const store = configureStore({
  reducer: staticReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: nonSerializableFields.map(({ key }) => key),
      },
      immutableCheck: {
        ignoredPaths: nonSerializableFields.map(({ key }) => key),
      },
    }),
  devTools: {
    stateSanitizer: (state) => {
      const sanitize = produce<typeof state>((draft) => {
        nonSerializableFields.forEach(({ key, replacement }) => {
          if (get(draft, key)) {
            set(draft as object, key, replacement)
          }
        })
      })

      return sanitize(state)
    },
  },
})

const persistor = persistStore(store)

const asyncReducers: Record<string, Reducer> = {}

store.injectReducer = (key: string, asyncReducer: Reducer) => {
  asyncReducers[key] = asyncReducer

  const rootReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers,
  })

  store.replaceReducer(rootReducer)
}

export default store

export { persistor }

// Types for global synchronous store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

type Middlewares<S = RootState> = [ThunkMiddlewareFor<S>]

// Type factories for asynchronously loaded slices
export type MakeCurrentState<State> = RootState & State
export type MakeCurrentDispatch<State> = ExtractDispatchExtensions<
  Middlewares<MakeCurrentState<State>>
> &
  Dispatch
export type MakeCurrentThunk<State, ReturnType> = ThunkAction<
  ReturnType,
  MakeCurrentState<State>,
  unknown,
  AnyAction
>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
