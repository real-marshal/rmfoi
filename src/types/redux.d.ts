export {}

declare module '@reduxjs/toolkit' {
  interface Store {
    injectReducer: (key: string, asyncReducer: Reducer) => void
  }
}
