import { addRGBA, multiplyRGBA } from './color-utils'

export interface AdjustmentsState {
  temperature?: number
  tint?: number
  offset?: number
  multiply?: number
}

export type AdjustmentKey = keyof AdjustmentsState

interface Adjustment {
  name: AdjustmentKey
  label: string
  initialValue: number
  minValue: number
  maxValue: number
}

type AdjustmentFunction = (
  imageData: Uint8ClampedArray,
  adjustmentsState: AdjustmentsState
) => Uint8ClampedArray

export const adjustments: Adjustment[] = [
  {
    name: 'temperature',
    label: 'Temperature',
    initialValue: 0,
    minValue: -100,
    maxValue: 100,
  },
  {
    name: 'tint',
    label: 'Tint',
    initialValue: 0,
    minValue: -100,
    maxValue: 100,
  },
  {
    name: 'offset',
    label: 'Offset',
    initialValue: 0,
    minValue: -100,
    maxValue: 100,
  },
  {
    name: 'multiply',
    label: 'Multiply',
    initialValue: 1,
    minValue: 0,
    maxValue: 2,
  },
]

export const adjustmentsMap = adjustments.reduce(
  (result, { name, ...adjustmentProperties }) => ({ ...result, [name]: adjustmentProperties }),
  {}
) as Record<AdjustmentKey, Omit<Adjustment, 'name'>>

const temperature: AdjustmentFunction = (imageData, { temperature }) =>
  temperature ? addRGBA(imageData, { B: temperature }) : imageData

const tint: AdjustmentFunction = (imageData, { tint }) =>
  tint ? addRGBA(imageData, { G: -tint }) : imageData

const offset: AdjustmentFunction = (imageData, { offset }) =>
  offset ? addRGBA(imageData, { R: offset, G: offset, B: offset }) : imageData

const multiply: AdjustmentFunction = (imageData, { multiply }) =>
  multiply !== undefined && multiply !== 1
    ? multiplyRGBA(imageData, { R: multiply, G: multiply, B: multiply })
    : imageData

// Adjustments should be applied in the order they are defined in the following array
const adjustmentFunctions = [temperature, tint, offset, multiply]

const adjustmentFunctionsMap: Record<AdjustmentKey, AdjustmentFunction> = {
  temperature,
  tint,
  offset,
  multiply,
}

export const applyAdjustments = (
  imageData: Uint8ClampedArray,
  adjustmentsState: AdjustmentsState
) =>
  adjustmentFunctions.reduce(
    (result, adjustmentFunction) => adjustmentFunction(result, adjustmentsState),
    imageData
  )

export const applyAdjustment = (
  imageData: Uint8ClampedArray,
  name: AdjustmentKey,
  value: AdjustmentsState[AdjustmentKey]
) => adjustmentFunctionsMap[name](imageData, { [name]: value })
