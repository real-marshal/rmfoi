import localforage from 'localforage'
import type { Storage } from 'redux-persist'

export const createIDBStorage = (name: string): Storage => {
  const lfInstance = localforage.createInstance({
    name,
    storeName: name,
    driver: localforage.INDEXEDDB,
  })

  return {
    getItem(key) {
      return lfInstance.getItem(key)
    },
    setItem(key, value) {
      return lfInstance.setItem(key, value)
    },
    removeItem(key) {
      return lfInstance.removeItem(key)
    },
  }
}
