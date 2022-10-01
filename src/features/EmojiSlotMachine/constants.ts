export const emojisMap = {
  '🐈': 'meow meow bitch',
  '🤦‍♀️': 'facepalm',
  '💀': 'dead',
  '🤡': 'oficially a clown',
  '🚀': 'to the moon!',
  '🤓': 'too nerdy',
  '🤯': 'mind fking blown',
  '🤑': '$$$$$$$$',
  '💩': 'shiiiit',
  '😈': 'so bad',
  '👊': 'nice one bro',
  '💪': 'gigachad',
  '💅': 'yas queen',
  '🦍': 'apes together strong',
  '💦': 'aaahhhhh',
  '🍑': 'nice booty',
  '🌶': 'damn so hot',
  '🗿': 'bruh',
  '🍆': 'wow so long',
  '📈': 'stonks go up',
  '💎': 'diamond hands',
  '🙈': 'nothing to see here',
  '🍻': 'cheers',
  '🏆': 'actually won the game',
  '🎉': 'congrats',
  '👑': 'king',
} as const

export type Emoji = keyof typeof emojisMap

export const emojis = Object.keys(emojisMap) as readonly Emoji[]

export const MIN_CHANCE = 1
export const MAX_CHANCE = 100

export enum EmojiSlotMachineMode {
  EASY = 'easy',
  STANDARD = 'standard',
  HARD = 'hard',
}

export const modeData = {
  [EmojiSlotMachineMode.EASY]: {
    chance: 40,
    chanceIncrement: 5,
  },
  [EmojiSlotMachineMode.STANDARD]: {
    chance: 20,
    chanceIncrement: 5,
  },
  [EmojiSlotMachineMode.HARD]: {
    chance: 10,
    chanceIncrement: 2.5,
  },
} as const

export const loseMessages = ['loser', 'meh', 'rekt', 'lost again?', 'fail'] as const
