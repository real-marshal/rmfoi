import { addRGBA } from './color-utils'

export interface AdjustmentsState {
  temperature?: number
  tint?: number
}

export type AdjustmentKey = keyof AdjustmentsState

interface Adjustment {
  name: AdjustmentKey
  label: string
  initialValue: number
  minValue?: number
  maxValue?: number
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
]

export const adjustmentsMap = adjustments.reduce(
  (result, { name, ...adjustmentProperties }) => ({ ...result, [name]: adjustmentProperties }),
  {}
) as Record<AdjustmentKey, Omit<Adjustment, 'name'>>

const temperature: AdjustmentFunction = (imageData, { temperature }) =>
  temperature ? addRGBA(imageData, { B: temperature }) : imageData

const tint: AdjustmentFunction = (imageData, { tint }) =>
  tint ? addRGBA(imageData, { G: -tint }) : imageData

// Adjustments should be applied in the order they are defined in the following array
const adjustmentFunctions = [temperature, tint]

export const applyAdjustments = (
  imageData: Uint8ClampedArray,
  adjustmentsState: AdjustmentsState
) =>
  adjustmentFunctions.reduce(
    (result, adjustmentFunction) => adjustmentFunction(result, adjustmentsState),
    imageData
  )

const adjustmentFunctionsMap: Record<AdjustmentKey, AdjustmentFunction> = {
  temperature,
  tint,
}

export const applyAdjustment = (
  imageData: Uint8ClampedArray,
  name: AdjustmentKey,
  value: AdjustmentsState[AdjustmentKey]
) => adjustmentFunctionsMap[name](imageData, { [name]: value })
