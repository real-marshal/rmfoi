import { Heading } from '@/components'
import { dt } from '@/features/Theming'
import styled from '@emotion/styled'
import { adjustments, adjustmentsMap } from '../adjustments'
import { selectAdjustmentsStateStrings, useCurrentSelector } from '../store'
import { AdjustmentInput } from './AdjustmentInput'

const ManipulatorsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${dt.gap.sm};
  width: 100%;
  border: 2px solid black;
  border-radius: 10px;
`

const StyledHeading = styled(Heading)`
  border-bottom: 2px solid black;
  padding: ${dt.padding.md};
  background: ${dt.theme.background};
  border-radius: 10px 10px 0 0;
`

const AdjustmentsContainer = styled.div`
  display: grid;
  grid-template-columns: min-content auto 5ch;
  column-gap: ${dt.gap.sm};
  row-gap: ${dt.gap.xs};
  padding: ${dt.padding.sm};
  align-items: center;
`

const ImageManipulators = () => {
  const adjustmentsState = useCurrentSelector(selectAdjustmentsStateStrings)

  return (
    <form>
      <ManipulatorsGroup>
        <StyledHeading type='h3' underline={false}>
          Basic adjustments
        </StyledHeading>
        <AdjustmentsContainer>
          {adjustments.map(({ label, name, minValue, maxValue }) => (
            <AdjustmentInput
              label={label}
              name={name}
              key={name}
              value={adjustmentsState[name] ?? adjustmentsMap[name].initialValue.toString()}
              minValue={minValue}
              maxValue={maxValue}
            />
          ))}
        </AdjustmentsContainer>
      </ManipulatorsGroup>
    </form>
  )
}

export { ImageManipulators }
