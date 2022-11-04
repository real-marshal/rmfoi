export {}

declare module '@reduxjs/toolkit' {
  interface Store {
    injectReducer: (key: string, asyncReducer: Reducer) => void
  }
}

// This is fixed in master but they haven't made a release in years
// and I think it would be a bad idea to set it to master in package.json
declare module 'redux-persist' {
  interface PersistConfig {
    deserialize?: boolean
  }
}
