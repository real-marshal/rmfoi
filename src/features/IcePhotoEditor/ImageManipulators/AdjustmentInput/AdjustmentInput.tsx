import styled from '@emotion/styled'
import type { ChangeEventHandler } from 'react'
import { AdjustmentKey, adjustmentsMap } from '../../adjustments'
import { updateAdjustments, useCurrentDispatch } from '../../store'
import { sanitizeNumberInput } from '../../utils'

interface AdjustmentInputProps {
  name: AdjustmentKey
  value: string
  label: string
  minValue?: number | undefined
  maxValue?: number | undefined
}

const AdjustmentLabel = styled.label``

const SliderInput = styled.input``

const TextInput = styled.input``

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

  return (
    <>
      <AdjustmentLabel>{label}</AdjustmentLabel>
      <SliderInput type='range' value={value} onChange={onChange} min={minValue} max={maxValue} />
      <TextInput type='number' value={value} onChange={onChange} />
    </>
  )
}

export { AdjustmentInput }
export type { AdjustmentInputProps }
