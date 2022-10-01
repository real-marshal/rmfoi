import { randomInt } from './number'

// Durstenfeld shuffle - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export const shuffle = <T>(arr: T[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(0, i)
    ;[arr[i], arr[j]] = [arr[j], arr[i]] as [T, T]
  }

  return arr
}

export const pickRandom = <T>(arr: readonly T[]) => arr[randomInt(0, arr.length - 1)] as T
