import styled from '@emotion/styled'
import type { ChangeEventHandler } from 'react'
import { AdjustmentKey, adjustmentsMap } from '../../adjustments'
import { updateAdjustments, useCurrentDispatch } from '../../store'
import { sanitizeNumberInput } from '../../utils'

interface AdjustmentInputProps {
  name: AdjustmentKey
  value: string
  label: string
  minValue: number
  maxValue: number
}

const AdjustmentLabel = styled.label`
  font-family: monospace;
`

const SliderInput = styled.input`
  width: 100%;
`

const TextInput = styled.input``

const steps = 200 as const

const AdjustmentInput = ({ name, value, label, minValue, maxValue }: AdjustmentInputProps) => {
  const dispatch = useCurrentDispatch()

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(
      updateAdjustments({
        name,
        prevValue: sanitizeNumberInput(adjustmentsMap[name].initialValue.toString()),
        currentValue: sanitizeNumberInput(e.target.value),
      })
    )
  }

  const step = (maxValue - minValue) / steps

  return (
    <>
      <AdjustmentLabel>{label}</AdjustmentLabel>
      <SliderInput
        type='range'
        value={value}
        onChange={onChange}
        min={minValue}
        max={maxValue}
        step={step}
      />
      <TextInput type='number' value={value} onChange={onChange} min={minValue} max={maxValue} />
    </>
  )
}

export { AdjustmentInput }
export type { AdjustmentInputProps }
