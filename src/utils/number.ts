export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max + 1 - min)) + min

export const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value
