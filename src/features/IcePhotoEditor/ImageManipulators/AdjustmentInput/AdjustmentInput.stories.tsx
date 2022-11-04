import type { Meta, Story } from '@storybook/react'
import { AdjustmentInput, AdjustmentInputProps } from './AdjustmentInput'

export default {
  title: 'Features/IcePhotoEditor/Common/AdjustmentInput',
  component: AdjustmentInput,
} as Meta

const Template: Story<AdjustmentInputProps> = (args) => <AdjustmentInput {...args} />

export const Basic = Template.bind({})
Basic.args = {}
