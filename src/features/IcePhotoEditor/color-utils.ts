import { clamp } from '@/utils'

export interface RGB {
  R: number
  G: number
  B: number
}

export interface RGBA extends RGB {
  A: number
}

// Could be an argument at some point
export const bitDepth = 8
export const maxBitDepthValue = 2 ** bitDepth - 1

export const clampToBitDepth = (value: number) => clamp(value, 0, maxBitDepthValue)

export const iterateRGBA = (image: Uint8ClampedArray, callback: (rgba: RGBA) => Partial<RGBA>) => {
  const numberOfChannels = 4

  for (let i = 0; i < image.length; i += numberOfChannels) {
    const { R, G, B, A } = callback({
      R: image[i + 0]!,
      G: image[i + 1]!,
      B: image[i + 2]!,
      A: image[i + 3]!,
    })

    if (R !== undefined) image[i + 0] = clampToBitDepth(R)
    if (G !== undefined) image[i + 1] = clampToBitDepth(G)
    if (B !== undefined) image[i + 2] = clampToBitDepth(B)
    if (A !== undefined) image[i + 3] = clampToBitDepth(A)
  }

  return image
}

export const multiplyRGBA = (image: Uint8ClampedArray, multiplier: Partial<RGBA>) =>
  iterateRGBA(image, ({ R, G, B, A }) => ({
    R: multiplier.R === undefined ? R : R * multiplier.R,
    G: multiplier.G === undefined ? G : G * multiplier.G,
    B: multiplier.B === undefined ? B : B * multiplier.B,
    A: multiplier.A === undefined ? A : A * multiplier.A,
  }))

export const addRGBA = (image: Uint8ClampedArray, increment: Partial<RGBA>) =>
  iterateRGBA(image, ({ R, G, B, A }) => ({
    R: increment.R === undefined ? R : R + increment.R,
    G: increment.G === undefined ? G : G + increment.G,
    B: increment.B === undefined ? B : B + increment.B,
    A: increment.A === undefined ? A : A + increment.A,
  }))

// Adaptation of https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
// Temp is supposed to be between 1000 and 40 000
export const getTemparatureRGB = (temp: number): RGB => {
  const workingTemp = clamp(temp, 1000, 40_000) / 100

  return {
    R:
      workingTemp <= 66
        ? maxBitDepthValue
        : clampToBitDepth(329.698_727_446 * (workingTemp - 60) ** -0.133_204_759_2),

    G:
      workingTemp <= 66
        ? clampToBitDepth(99.470_802_586_1 * Math.log(workingTemp) - 161.119_568_166_1)
        : clampToBitDepth(288.122_169_528_3 * (workingTemp - 60) ** -0.075_514_849_2),

    B:
      workingTemp >= 66
        ? maxBitDepthValue
        : workingTemp <= 19
        ? 0
        : clampToBitDepth(138.517_731_223_1 * Math.log(workingTemp - 10) - 305.044_792_730_7),
  }
}

export const linearize = (image: Uint8ClampedArray, encodedGamma = 2.2) =>
  iterateRGBA(image, ({ R, G, B }) => ({
    R: R ** (1 / encodedGamma),
    G: G ** (1 / encodedGamma),
    B: B ** (1 / encodedGamma),
  }))
