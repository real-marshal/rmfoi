import { Heading } from '@/components'
import { dt } from '@/features/Theming'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { AdjustmentKey, adjustmentsMap } from '../adjustments'
import {
  actions,
  selectCurrentHistoryPointer,
  selectHistory,
  useCurrentDispatch,
  useCurrentSelector,
} from '../store'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${dt.gap.md};
`

const HistoryElements = styled.ul`
  width: 100%;
  min-height: 200px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 0;
  display: flex;
  flex-direction: column-reverse;
`

const HistoryElement = styled.li<{ selected: boolean }>`
  list-style: none;
  display: flex;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: ${dt.gap.xs};
  font-size: ${dt.fontSize.sm};
  background: #555;
  color: ${dt.colors.light};
  padding: ${dt.padding.md};
  border-top: 1px solid ${dt.colors.dark};
  cursor: pointer;

  &:first-of-type {
    border-radius: 0 0 10px 10px;
  }

  ${({ selected }) =>
    selected &&
    css`
      background: #999;
    `}
`

const HistoryElementDate = styled.span``

const HistoryElementAdjustmentName = styled.span`
  font-weight: bold;
`

const HistoryElementAdjustmentValue = styled.span<{ prevValue?: boolean }>`
  ${({ prevValue }) =>
    prevValue &&
    css`
      color: #aaa;
      margin-right: ${dt.margin.md};
    `}
`

const ImageHistory = () => {
  const historyStack = useCurrentSelector(selectHistory)
  const currentHistoryPointer = useCurrentSelector(selectCurrentHistoryPointer)

  const dispatch = useCurrentDispatch()

  const setCurrentHistoryElement = (date: number) => {
    dispatch(actions.setCurrentHistoryElement(date))
    dispatch(actions.applyAdjustments())
  }

  return (
    <Container>
      <Heading type='h2'>History</Heading>
      <HistoryElements>
        {historyStack.map(({ date, adjustment }, index) => (
          <HistoryElement
            key={date}
            onClick={() => setCurrentHistoryElement(date)}
            selected={currentHistoryPointer + 1 === index}
          >
            <HistoryElementDate>{new Date(date).toLocaleTimeString()}</HistoryElementDate>
            <HistoryElementAdjustmentName>
              {
                // Condition is required for 'Image Loaded' label
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                adjustmentsMap[adjustment.name as AdjustmentKey]?.label ?? adjustment.name
              }
            </HistoryElementAdjustmentName>
            <HistoryElementAdjustmentValue prevValue>
              {adjustment.prevValue}
            </HistoryElementAdjustmentValue>
            <HistoryElementAdjustmentValue>{adjustment.currentValue}</HistoryElementAdjustmentValue>
          </HistoryElement>
        ))}
      </HistoryElements>
    </Container>
  )
}

export { ImageHistory }
