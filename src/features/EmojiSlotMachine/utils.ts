import { randomInt, shuffle } from '@/utils'
import { emojis, MAX_CHANCE, MIN_CHANCE } from './constants'

export const getShuffledEmojiArrays = (columns: number) =>
  [...(new Array(columns) as undefined[])].map(() => shuffle([...emojis]))

export const tryToWin = ({
  chance,
  minIndexToWin,
  maxIndexToWin,
}: {
  chance: number
  minIndexToWin: number
  maxIndexToWin: number
}) => {
  const isWin = randomInt(MIN_CHANCE, MAX_CHANCE) <= chance

  if (!isWin) return

  const wonEmoji = emojis[randomInt(minIndexToWin, maxIndexToWin)]!

  return wonEmoji
}

export interface EmojiSwapData {
  arrayIndex: number
  emojiInd1: number
  emojiInd2: number
}

export const getWonEmojiIndexes = ({
  emojiArrays,
  wonEmoji,
  minIndexToWin,
  maxIndexToWin,
}: {
  emojiArrays: string[][]
  wonEmoji: string
  minIndexToWin: number
  maxIndexToWin: number
}): { wonEmojiIndexes: number[]; emojisToSwap: EmojiSwapData[] } => {
  const emojisToSwap: EmojiSwapData[] = []

  const wonEmojiIndexes = emojiArrays.map((shuffledEmojis, ind) => {
    const wonEmojiIndex = shuffledEmojis.indexOf(wonEmoji)

    if (wonEmojiIndex < minIndexToWin || wonEmojiIndex > maxIndexToWin) {
      const newWonEmojiIndex = randomInt(minIndexToWin, maxIndexToWin)

      emojisToSwap.push({
        arrayIndex: ind,
        emojiInd1: wonEmojiIndex,
        emojiInd2: newWonEmojiIndex,
      })

      return newWonEmojiIndex
    }
    return wonEmojiIndex
  })

  return { wonEmojiIndexes, emojisToSwap }
}
